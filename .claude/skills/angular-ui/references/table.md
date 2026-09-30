# List pages on the shared table

Every list, grid or report table uses `BmgTable` from `@pos-frontend/shared/ui` (selector `pos-frontend-table`). Don't hand-roll `mat-table` or use a Clarity datagrid for new screens. The shared table already provides loading skeleton rows, the empty state, pagination and the card chrome.

## API (`libs/shared/ui/src/lib/table/table.ts`)

| Input | Type | Default | Use |
|---|---|---|---|
| `data` | `MatTableDataSource<T>` | **required** | Rows. Wrap the store's array in a `computed()`. |
| `columns` | `TableColumnDef[]` | **required** | `{ key, header, align?, template? }`. `key` is also the `matColumnDef` name. |
| `loading` | `boolean` | `false` | Shows 10 skeleton rows while there is no data yet. |
| `paginated` | `boolean` | `false` | **Server-side** paging: shows the paginator and emits `(page)`. |
| `total` | `number` | `0` | Total record count for the server-side paginator. |
| `tplPagination` | `boolean` | `false` | **Client-side** paging: attaches the paginator to the data source. Also set `paginated` so the paginator renders. |
| `caption` | `string` | `'Data'` | Screen-reader caption, and the noun in "No categories found". Use the plural. |
| `action` | `boolean` | `false` | Adds an "Add \<caption\>" button to the empty state, which emits `(actioned)`. |
| `footer` | `boolean` | `false` | Renders the footer row without a paginator, for `<footer>` projection such as totals. |
| `type` | `'card' \| 'default'` | `'card'` | `'default'` drops the `mat-card` wrapper, for use inside an existing card or drawer. |

Outputs: `page: PageEvent` and `actioned: void`.

Content projection: `<header>` renders above the table (title, actions, filters) and `<footer>` renders in the footer row next to the paginator.

Without a `template`, a cell renders `row[col.key]`, so `key` must match the entity field. For anything formatted (dates, money, status chips, nested fields, actions), give the column a `template`. The template context is `$implicit` for the row and `col` for the column definition.

## Server-paginated list page

This is the default for anything backed by a `Page<T>` endpoint.

```ts
import { ChangeDetectionStrategy, Component, Injector, type TemplateRef, computed, inject, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { type PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DrawerService } from '@pos-frontend/core';
import { BmgTable, type TableColumnDef } from '@pos-frontend/shared/ui';
import { ThingStore } from '@pos-frontend/things/data-access';
import { CreateThingComponent } from '../create-thing/create-thing.component';

const FIRST_PAGE = { page: 0, size: 10 };

@Component({
  selector: 'pos-frontend-things-list',
  templateUrl: './things-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BmgTable, MatButtonModule, MatIconModule],
})
export class ThingsListComponent {
  private readonly drawer = inject(DrawerService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly injector = inject(Injector);
  protected readonly thingStore = inject(ThingStore);

  private readonly actionsTpl = viewChild<TemplateRef<unknown>>('actionsTpl');
  private readonly createdTpl = viewChild<TemplateRef<unknown>>('createdTpl');

  protected readonly loading = this.thingStore.getPaginatedLoading;
  protected readonly total = this.thingStore.totalThings;
  protected readonly dataSource = computed(() => new MatTableDataSource(this.thingStore.paginatedThings()));

  // computed() because the templates resolve after the first render
  protected readonly columns = computed<TableColumnDef[]>(() => [
    { key: 'code', header: 'Code' },
    { key: 'name', header: 'Name' },
    { key: 'createdAt', header: 'Created', template: this.createdTpl() },
    { key: 'actions', header: '', align: 'right', template: this.actionsTpl() },
  ]);

  constructor() {
    this.thingStore.getPaginatedThings(FIRST_PAGE);
  }

  protected onPage(event: PageEvent): void {
    this.thingStore.getPaginatedThings({ page: event.pageIndex, size: event.pageSize });
  }

  protected add(): void {
    this.drawer
      .open<CreateThingComponent, boolean>(CreateThingComponent, {
        title: 'New Thing',
        size: 'md',
        injector: this.injector,
      })
      .afterClosed()
      .subscribe((created) => {
        if (created) {
          this.thingStore.getPaginatedThings(FIRST_PAGE);
        }
      });
  }

  protected edit(id: string | number): void {
    this.thingStore.getThing({ id });
    void this.router.navigate(['./update', id], { relativeTo: this.route });
  }
}
```

```html
<ng-template #createdTpl let-row>{{ row.createdAt | date: 'mediumDate' }}</ng-template>

<ng-template #actionsTpl let-row>
  <button type="button" mat-icon-button aria-label="Edit" (click)="edit(row.id)">
    <mat-icon class="text-green-600">edit</mat-icon>
  </button>
</ng-template>

<pos-frontend-table
  caption="Things"
  [action]="true"
  [columns]="columns()"
  [data]="dataSource()"
  [loading]="loading()"
  [paginated]="true"
  [total]="total()"
  (actioned)="add()"
  (page)="onPage($event)"
>
  <header class="flex flex-wrap items-center justify-between gap-4 px-4 py-2">
    <div>
      <h1 class="text-2xl font-bold">Things</h1>
      <p class="text-sm text-gray-600">Manage things</p>
    </div>
    <button type="button" mat-flat-button (click)="add()">
      <mat-icon>add_circle</mat-icon>
      Add New
    </button>
  </header>
</pos-frontend-table>
```

(If a template uses the `date` pipe, add `DatePipe` to `imports`.)

Points that are easy to get wrong:

- `columns` must be a `computed()` that reads the `viewChild` signals. A plain array would capture `undefined` templates.
- `dataSource` is a `computed()` over the store signal, so new pages flow in automatically. Don't keep a mutable `MatTableDataSource` field and reassign `.data`.
- Pass `injector: this.injector` to `drawer.open()`. Without it, the drawer content resolves from the root injector and misses route-scoped providers.
- Static string inputs are plain attributes (`caption="Things"`), not `[caption]="'Things'"`.
- The page event gives `pageIndex`/`pageSize`, while the store's paginated `rxMethod` takes `page`/`size`. Check the store's parameter shape.
- Refresh after a create by re-requesting the first page in `afterClosed()`, only when the result is truthy.

## Client-side list (small, fully loaded collections)

Load everything with the store's `getAll<X>()`, build the data source from `<x>s()`, and set both `[paginated]="true"` and `[tplPagination]="true"`, leaving out `total` and `(page)`. For filtering, keep a `signal<string>('')` and derive the rows with `computed()` before wrapping them in `MatTableDataSource`.

## Tables inside a drawer or card

Use `type="default"` so you don't nest a `mat-card` inside the drawer panel or an existing card.

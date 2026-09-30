import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  type TemplateRef,
  computed,
  inject,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { type PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryStore } from '@pos-frontend/categories/data-access';
import { DrawerService } from '@pos-frontend/core';
import { BmgTable, type TableColumnDef } from '@pos-frontend/shared/ui';
import { CreateCategoryComponent } from '../create-category/create-category.component';

const FIRST_PAGE = { page: 0, size: 10 };

@Component({
  selector: 'pos-frontend-categories-list',
  templateUrl: './categories-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BmgTable, MatIconModule, MatButtonModule],
})
export class CategoriesListComponent {
  private readonly drawer = inject(DrawerService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly injector = inject(Injector);
  private readonly categoryStore = inject(CategoryStore);

  private readonly actionsTpl = viewChild<TemplateRef<unknown>>('actionsTpl');

  protected readonly loading = this.categoryStore.getPaginatedLoading;
  protected readonly total = this.categoryStore.totalCategories;
  protected readonly dataSource = computed(
    () => new MatTableDataSource(this.categoryStore.paginatedCategories())
  );

  protected readonly columns = computed<TableColumnDef[]>(() => [
    { key: 'code', header: 'Code' },
    { key: 'name', header: 'Name' },
    { key: 'createdBy', header: 'Created By' },
    { key: 'actions', header: '', align: 'right', template: this.actionsTpl() },
  ]);

  constructor() {
    this.categoryStore.getPaginatedCategories(FIRST_PAGE);
  }

  protected onPage(event: PageEvent): void {
    this.categoryStore.getPaginatedCategories({
      page: event.pageIndex,
      size: event.pageSize,
    });
  }

  protected add(): void {
    this.drawer
      .open<CreateCategoryComponent, boolean>(CreateCategoryComponent, {
        title: 'New Category',
        size: 'md',
        injector: this.injector,
      })
      .afterClosed()
      .subscribe((created) => {
        if (created) {
          this.categoryStore.getPaginatedCategories(FIRST_PAGE);
        }
      });
  }

  protected edit(id: string | number): void {
    void this.router.navigate(['./update', id], { relativeTo: this.route });
  }
}

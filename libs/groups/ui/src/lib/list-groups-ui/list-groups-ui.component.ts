import {
  ChangeDetectionStrategy,
  Component,
  type TemplateRef,
  computed,
  input,
  output,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { type PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import type { GroupsEntity } from '@pos-frontend/groups/data-access';
import { BmgTable, type TableColumnDef } from '@pos-frontend/shared/ui';

/**
 * Server-paginated groups table. Project a `<header>` to render a title and
 * actions above the table.
 */
@Component({
  selector: 'pos-frontend-list-groups-ui',
  templateUrl: './list-groups-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BmgTable, MatButtonModule, MatIconModule],
})
export class ListGroupsUiComponent {
  readonly groups = input<GroupsEntity[]>([]);
  readonly total = input(0);
  readonly loading = input(false);

  readonly page = output<PageEvent>();
  readonly actioned = output<void>();
  /** Emits the group id. */
  readonly permissionsViewed = output<string | number>();

  private readonly permissionsTpl = viewChild<TemplateRef<unknown>>('permissionsTpl');
  private readonly actionsTpl = viewChild<TemplateRef<unknown>>('actionsTpl');

  protected readonly dataSource = computed(() => new MatTableDataSource(this.groups()));

  protected readonly columns = computed<TableColumnDef[]>(() => [
    { key: 'name', header: 'Name' },
    { key: 'createdBy', header: 'Created By' },
    { key: 'permissions', header: '', template: this.permissionsTpl() },
    { key: 'actions', header: '', align: 'right', template: this.actionsTpl() },
  ]);
}

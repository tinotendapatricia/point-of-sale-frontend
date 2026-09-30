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
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { type PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BmgTable, type TableColumnDef } from '@pos-frontend/shared/ui';
import type { UsersEntity } from '@pos-frontend/users/data-access';

/**
 * Server-paginated users table. Project a `<header>` to render a title and
 * actions above the table.
 */
@Component({
  selector: 'pos-frontend-list-users-ui',
  templateUrl: './list-users-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BmgTable, MatButtonModule, MatChipsModule, MatIconModule, MatMenuModule],
})
export class ListUsersUiComponent {
  readonly users = input<UsersEntity[]>([]);
  readonly total = input(0);
  readonly loading = input(false);

  readonly page = output<PageEvent>();
  readonly actioned = output<void>();
  readonly edited = output<UsersEntity>();
  readonly statusChanged = output<UsersEntity>();
  readonly authoritiesViewed = output<UsersEntity>();

  private readonly statusTpl = viewChild<TemplateRef<unknown>>('statusTpl');
  private readonly actionsTpl = viewChild<TemplateRef<unknown>>('actionsTpl');

  protected readonly dataSource = computed(() => new MatTableDataSource(this.users()));

  protected readonly columns = computed<TableColumnDef[]>(() => [
    { key: 'username', header: 'Username' },
    { key: 'name', header: 'Name' },
    { key: 'status', header: 'Status', template: this.statusTpl() },
    { key: 'actions', header: '', align: 'right', template: this.actionsTpl() },
  ]);
}

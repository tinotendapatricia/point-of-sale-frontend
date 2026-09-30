import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { type PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RoleStore } from '@pos-frontend/roles/data-access';
import { BmgTable, type TableColumnDef } from '@pos-frontend/shared/ui';

const FIRST_PAGE = { page: 0, size: 10 };

/** Legacy, unrouted: a read-only paginated list of roles. */
@Component({
  selector: 'pos-frontend-list-roles',
  templateUrl: './list-roles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BmgTable],
})
export class ListRolesComponent {
  private readonly roleStore = inject(RoleStore);

  protected readonly loading = this.roleStore.getPaginatedLoading;
  protected readonly total = this.roleStore.totalRoles;
  protected readonly dataSource = computed(() => new MatTableDataSource(this.roleStore.paginatedRoles()));

  protected readonly columns: TableColumnDef[] = [
    { key: 'name', header: 'Name' },
    { key: 'createdBy', header: 'Created By' },
  ];

  constructor() {
    this.roleStore.getPaginatedRoles(FIRST_PAGE);
  }

  protected onPage(event: PageEvent): void {
    this.roleStore.getPaginatedRoles({ page: event.pageIndex, size: event.pageSize });
  }
}

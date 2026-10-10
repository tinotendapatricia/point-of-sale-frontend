import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  type TemplateRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { type PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DrawerService } from '@pos-frontend/core';
import { type RolesEntity, RoleStore } from '@pos-frontend/roles/data-access';
import { BmgTable, type TableColumnDef } from '@pos-frontend/shared/ui';

import { CreateRoleComponent } from '../create-role/create-role.component';
import { type DeleteRoleData, DeleteRoleComponent } from '../delete-role/delete-role.component';

const FIRST_PAGE = { page: 0, size: 10 };

@Component({
  selector: 'pos-frontend-list-roles',
  templateUrl: './list-roles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BmgTable, MatButtonModule, MatIconModule],
})
export class ListRolesComponent {
  private readonly injector = inject(Injector);
  private readonly drawer = inject(DrawerService);
  private readonly dialog = inject(MatDialog);
  private readonly roleStore = inject(RoleStore);

  private readonly actionsTpl = viewChild<TemplateRef<unknown>>('actionsTpl');
  private readonly nameTpl = viewChild<TemplateRef<unknown>>('nameTpl');

  private readonly currentPage = signal(FIRST_PAGE);

  protected readonly loading = this.roleStore.getPaginatedLoading;
  protected readonly total = this.roleStore.totalRoles;
  protected readonly dataSource = computed(
    () => new MatTableDataSource(this.roleStore.paginatedRoles())
  );

  protected readonly columns = computed<TableColumnDef[]>(() => [
    { key: 'name', header: 'Name', template: this.nameTpl() },
    { key: 'createdBy', header: 'Created By' },
    { key: 'actions', header: '', align: 'right', template: this.actionsTpl() },
  ]);

  constructor() {
    this.load(FIRST_PAGE);
  }

  protected onPage(event: PageEvent): void {
    this.load({ page: event.pageIndex, size: event.pageSize });
  }

  protected refresh(): void {
    this.load(this.currentPage());
  }

  protected add(): void {
    this.openForm('New Role');
  }

  protected edit(role: RolesEntity): void {
    this.openForm('Update Role', role);
  }

  protected remove(role: RolesEntity): void {
    this.dialog
      .open<DeleteRoleComponent, DeleteRoleData, boolean>(DeleteRoleComponent, {
        width: '420px',
        data: { role },
      })
      .afterClosed()
      .subscribe((deleted) => this.refreshIf(deleted));
  }

  protected label(role: RolesEntity): string {
    return role.name.split('_').join(' ').toLowerCase();
  }

  private openForm(title: string, role?: RolesEntity): void {
    this.drawer
      .open<CreateRoleComponent, boolean, RolesEntity | undefined>(CreateRoleComponent, {
        title,
        size: 'sm',
        data: role,
        injector: this.injector,
      })
      .afterClosed()
      .subscribe((saved) => this.refreshIf(saved));
  }

  private refreshIf(changed: boolean | undefined): void {
    if (changed) {
      this.refresh();
    }
  }

  private load(filters: typeof FIRST_PAGE): void {
    this.currentPage.set(filters);
    this.roleStore.getPaginatedRoles(filters);
  }
}

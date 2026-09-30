import { ChangeDetectionStrategy, Component, Injector, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { type PageEvent } from '@angular/material/paginator';
import { type MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { DrawerService } from '@pos-frontend/core';
import { GroupStore } from '@pos-frontend/groups/data-access';
import { type UsersEntity, UserStore } from '@pos-frontend/users/data-access';
import { ListUsersUiComponent } from '@pos-frontend/users/ui';

import {
  type ChangeUserStatusData,
  ChangeUserStatusComponent,
} from '../change-user-status/change-user-status.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';

const PAGE_SIZE = 10;

@Component({
  selector: 'pos-frontend-list-users-by-group',
  templateUrl: './list-users-by-group.component.html',
  styleUrl: './list-users-by-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule, MatSelectModule, MatButtonModule, MatIconModule, ListUsersUiComponent],
})
export class ListUsersByGroupComponent {
  private readonly injector = inject(Injector);
  private readonly drawer = inject(DrawerService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly userStore = inject(UserStore);
  private readonly groupStore = inject(GroupStore);

  protected readonly groups = this.groupStore.groups;
  protected readonly users = this.userStore.paginatedUsers;
  protected readonly total = this.userStore.totalUsers;
  protected readonly loading = this.userStore.getPaginatedLoading;

  protected readonly groupId = signal<string | number | undefined>(undefined);

  constructor() {
    this.groupStore.getAllGroups();
  }

  protected onGroupChange(event: MatSelectChange<string | number>): void {
    this.groupId.set(event.value);
    this.refresh();
  }

  protected onPage(event: PageEvent): void {
    this.load(event.pageIndex, event.pageSize);
  }

  protected refresh(): void {
    this.load(0, PAGE_SIZE);
  }

  protected createUser(): void {
    this.drawer
      .open<CreateUserComponent, boolean>(CreateUserComponent, {
        title: 'Create New User',
        size: 'md',
        injector: this.injector,
      })
      .afterClosed()
      .subscribe((created) => {
        if (created) {
          this.refresh();
        }
      });
  }

  protected updateUser(user: UsersEntity): void {
    this.drawer
      .open<UpdateUserComponent, boolean, UsersEntity>(UpdateUserComponent, {
        title: 'Update User',
        size: 'md',
        data: user,
        injector: this.injector,
      })
      .afterClosed()
      .subscribe((updated) => {
        if (updated) {
          this.refresh();
        }
      });
  }

  protected changeUserStatus(user: UsersEntity): void {
    this.dialog
      .open<ChangeUserStatusComponent, ChangeUserStatusData, boolean>(ChangeUserStatusComponent, {
        width: '420px',
        data: { user },
        injector: this.injector,
      })
      .afterClosed()
      .subscribe((changed) => {
        if (changed) {
          this.refresh();
        }
      });
  }

  protected viewUserAuthorities(user: UsersEntity): void {
    void this.router.navigate(['./view-user-authorities', user.id], { relativeTo: this.route });
  }

  private load(page: number, size: number): void {
    const group = this.groupId();
    if (group === undefined) {
      return;
    }
    this.userStore.getPaginatedUsers({ group, page, size });
  }
}

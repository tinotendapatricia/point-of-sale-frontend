import { ChangeDetectionStrategy, Component, Injector, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { type PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { DrawerService } from '@pos-frontend/core';
import { type UsersEntity, UserStore } from '@pos-frontend/users/data-access';
import { ListUsersUiComponent } from '@pos-frontend/users/ui';

import {
  type ChangeUserStatusData,
  ChangeUserStatusComponent,
} from '../change-user-status/change-user-status.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';

const FIRST_PAGE = { page: 0, size: 10 };

@Component({
  selector: 'pos-frontend-list-users',
  templateUrl: './list-users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule, ListUsersUiComponent],
})
export class ListUsersComponent {
  private readonly injector = inject(Injector);
  private readonly drawer = inject(DrawerService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly userStore = inject(UserStore);

  protected readonly users = this.userStore.paginatedUsers;
  protected readonly total = this.userStore.totalUsers;
  protected readonly loading = this.userStore.getPaginatedLoading;

  constructor() {
    this.refresh();
  }

  protected onPage(event: PageEvent): void {
    this.userStore.getPaginatedUsers({ page: event.pageIndex, size: event.pageSize });
  }

  protected refresh(): void {
    this.userStore.getPaginatedUsers(FIRST_PAGE);
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
}

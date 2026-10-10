import { ChangeDetectionStrategy, Component, Injector, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { type PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { type UsersEntity, UserStore } from '@pos-frontend/users/data-access';
import { ListUsersUiComponent } from '@pos-frontend/users/ui';

import {
  type ChangeUserStatusData,
  ChangeUserStatusComponent,
} from '../change-user-status/change-user-status.component';
import { CreateUserComponent, type CreateUserData } from '../create-user/create-user.component';

const FIRST_PAGE = { page: 0, size: 10 };

@Component({
  selector: 'pos-frontend-list-users',
  templateUrl: './list-users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, ListUsersUiComponent],
})
export class ListUsersComponent {
  private readonly injector = inject(Injector);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly userStore = inject(UserStore);

  private readonly currentPage = signal(FIRST_PAGE);

  protected readonly users = this.userStore.paginatedUsers;
  protected readonly total = this.userStore.totalUsers;
  protected readonly loading = this.userStore.getPaginatedLoading;

  constructor() {
    this.load(FIRST_PAGE);
  }

  protected onPage(event: PageEvent): void {
    this.load({ page: event.pageIndex, size: event.pageSize });
  }

  protected refresh(): void {
    this.load(this.currentPage());
  }

  protected createUser(): void {
    this.openForm();
  }

  protected updateUser(user: UsersEntity): void {
    this.openForm(user);
  }

  protected changeUserStatus(user: UsersEntity): void {
    this.dialog
      .open<ChangeUserStatusComponent, ChangeUserStatusData, boolean>(ChangeUserStatusComponent, {
        width: '420px',
        data: { user },
        injector: this.injector,
      })
      .afterClosed()
      .subscribe((changed) => this.refreshIf(changed));
  }

  protected viewUser(user: UsersEntity): void {
    void this.router.navigate(['./view', user.id], { relativeTo: this.route });
  }

  protected viewUserAuthorities(user: UsersEntity): void {
    void this.router.navigate(['./view-user-authorities', user.id], { relativeTo: this.route });
  }

  private openForm(user?: UsersEntity): void {
    this.dialog
      .open<CreateUserComponent, CreateUserData, boolean>(CreateUserComponent, {
        width: '480px',
        data: { user },
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
    this.userStore.getPaginatedUsers(filters);
  }
}

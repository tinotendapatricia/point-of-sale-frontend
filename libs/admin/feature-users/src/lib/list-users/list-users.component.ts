import { Component, ChangeDetectionStrategy, Injector, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { UsersEntity, UsersFacade } from '@pos-frontend/users/data-access';
import { ListUsersUiComponent, UsersPageState } from '@pos-frontend/users/ui';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { ChangeUserStatusComponent } from '../change-user-status/change-user-status.component';

@Component({
    selector: 'pos-frontend-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCardModule, MatButtonModule, MatIconModule, ListUsersUiComponent]
})
export class ListUsersComponent {
  private readonly injector = inject(Injector);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly usersFacade = inject(UsersFacade);

  readonly allUsers = toSignal(this.usersFacade.allUsers$, { initialValue: [] });
  readonly totalUsers = toSignal(this.usersFacade.totalUsers$, { initialValue: 0 });
  readonly loading = toSignal(this.usersFacade.loading$, { initialValue: false });

  public getUserList(state: UsersPageState) {
    this.usersFacade.getPaginatesUsers(state);
  }

  refresh() {
    this.getUserList({});
  }

  createUser() {
    this.dialog
      .open(CreateUserComponent, { width: '480px', injector: this.injector })
      .afterClosed()
      .subscribe((created) => created && this.refresh());
  }

  updateUser(user: UsersEntity) {
    this.dialog
      .open(UpdateUserComponent, { width: '480px', data: { user }, injector: this.injector })
      .afterClosed()
      .subscribe((updated) => updated && this.refresh());
  }

  changeUserStatus(user: UsersEntity) {
    this.dialog
      .open(ChangeUserStatusComponent, { width: '420px', data: { user }, injector: this.injector })
      .afterClosed()
      .subscribe((changed) => changed && this.refresh());
  }

  viewUserAuthorities(user: UsersEntity) {
    this.router.navigate(['./view-user-authorities', user.id], {
      relativeTo: this.route,
    });
  }
}

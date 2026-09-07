import { Component, ChangeDetectionStrategy, Injector, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { GroupsFacade } from '@pos-frontend/groups/data-access';
import { UsersEntity, UsersFacade } from '@pos-frontend/users/data-access';
import { ListUsersUiComponent, UsersPageState } from '@pos-frontend/users/ui';
import { ChangeUserStatusComponent } from '../change-user-status/change-user-status.component';

@Component({
  selector: 'pos-frontend-list-users-by-group',
  templateUrl: './list-users-by-group.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./list-users-by-group.component.scss'],
  imports: [MatFormFieldModule, MatSelectModule, MatButtonModule, ListUsersUiComponent],
})
export class ListUsersByGroupComponent {
  private readonly injector = inject(Injector);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly usersFacade = inject(UsersFacade);
  readonly groupsFacade = inject(GroupsFacade);

  readonly allGroups = toSignal(this.groupsFacade.allGroups$, { initialValue: [] });
  readonly allUsers = toSignal(this.usersFacade.allUsers$, { initialValue: [] });
  readonly totalUsers = toSignal(this.usersFacade.totalUsers$, { initialValue: 0 });
  readonly loading = toSignal(this.usersFacade.loading$, { initialValue: false });

  readonly groupId = signal<string | number | undefined>(undefined);

  constructor() {
    this.groupsFacade.getAllGroups();
  }

  public getUserList(state: UsersPageState) {
    this.usersFacade.getPaginatesUsersByGroup(this.groupId()!, state);
  }

  onGroupChange(event: MatSelectChange) {
    this.groupId.set(event.value);
    this.getUserList({});
  }

  createUser() {
    this.router.navigate(['./create-user'], { relativeTo: this.route });
  }

  updateUser(user: UsersEntity) {
    this.router.navigate(['./update-user', user.id], { relativeTo: this.route });
  }

  viewUser(user: UsersEntity) {
    this.router.navigate(['./user-details', user.id], { relativeTo: this.route });
  }

  changeUserStatus(user: UsersEntity) {
    this.dialog
      .open(ChangeUserStatusComponent, { width: '420px', data: { user }, injector: this.injector })
      .afterClosed()
      .subscribe((changed) => changed && this.getUserList({}));
  }

  viewUserAuthorities(user: UsersEntity) {
    this.router.navigate(['./view-user-authorities', user.id], { relativeTo: this.route });
  }
}

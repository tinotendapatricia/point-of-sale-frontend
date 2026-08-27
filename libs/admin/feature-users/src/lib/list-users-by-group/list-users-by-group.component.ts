import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import { GroupsFacade } from '@pos-frontend/groups/data-access';
import { UsersEntity, UsersFacade } from '@pos-frontend/users/data-access';

@Component({
  selector: 'pos-frontend-list-users-by-group',
  templateUrl: './list-users-by-group.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./list-users-by-group.component.scss'],
})
export class ListUsersByGroupComponent implements OnInit, AfterViewChecked {
  public isUpdate = false;
  public isChangeStatus = false;
  public selectedUser!: UsersEntity;
  groupId!: string | number;

  constructor(
    public usersFacade: UsersFacade,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    public groupsFacade: GroupsFacade
  ) {}

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.groupsFacade.getAllGroups();
  }

  public getUserList(state: ClrDatagridStateInterface) {
    this.usersFacade.getPaginatesUsersByGroup(this.groupId, state);
  }

  getUsersListByGroup() {
    this.getUserList({});
  }

  refresh(isRefresh: boolean) {
    this.isUpdate = false;
    this.isChangeStatus = false;
    return isRefresh ? this.getUserList({}) : null;
  }

  updateUser(user: UsersEntity) {
    this.router.navigate(['./update-user', user.id], {
      relativeTo: this.route,
    });
  }

  viewUser(user: UsersEntity) {
    this.router.navigate(['./user-details', user.id], {
      relativeTo: this.route,
    });
  }

  createUser() {
    this.router.navigate(['./create-user'], {
      relativeTo: this.route,
    });
  }

  changeUserStatus(user: UsersEntity) {
    this.selectedUser = user;
    this.isChangeStatus = true;
  }

  viewUserAuthorities(userId: string | number) {
    this.router.navigate(['./view-user-authorities', userId], {
      relativeTo: this.route,
    });
  }
}

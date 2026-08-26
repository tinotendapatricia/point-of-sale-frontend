import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
//import { ClrDatagridStateInterface } from '@clr/angular';
import { UsersEntity, UsersFacade } from '@pos-frontend/users/data-access';

@Component({
    selector: 'pos-frontend-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.scss'],
    standalone: false
})
export class ListUsersComponent implements OnInit, AfterViewChecked {
  public isUpdate = false;
  public isCreate = false;
  public isChangeStatus = false;
  public selectedUser!: UsersEntity;

  constructor(
    public usersFacade: UsersFacade,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {}

  public getUserList(state: ClrDatagridStateInterface) {
    this.usersFacade.getPaginatesUsers(state);
  }

  refresh(isRefresh?: boolean) {
    this.isUpdate = false;
    this.isCreate = false;
    this.isChangeStatus = false;
     this.getUserList({}) 
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

  updateUser(user: UsersEntity) {
    this.selectedUser = user;
    this.isUpdate = true;
  }

  viewUserAuthorities(user: UsersEntity) {
    this.router.navigate(['./view-user-authorities', user.id], {
      relativeTo: this.route,
    });
  }
}

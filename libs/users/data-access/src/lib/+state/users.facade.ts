import { Injectable, inject } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { select, Store, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { CreateUserContext } from './users.models';
import * as UsersFeature from './users.reducer';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {
  //private readonly store = inject(Store);
  loaded$ = this.store.pipe(select(UsersSelectors.selectUsersLoaded));
  allUsers$ = this.store.pipe(select(UsersSelectors.selectAllUsers));
  selectedUser$ = this.store.pipe(select(UsersSelectors.getSelectedUser));
  loading$ = this.store.pipe(select(UsersSelectors.getUsersLoadingState));
  totalUsers$ = this.store.pipe(select(UsersSelectors.getTotalUsers));
  btnState$ = this.store.pipe(select(UsersSelectors.getBtnState));

  constructor(private store: Store<UsersFeature.UsersPartialState>) {}

  createNewUser(user: CreateUserContext) {
    this.store.dispatch(UsersActions.createUser(user));
  }

  /*updateUserUser(updateContext: any) {
    this.store.dispatch(UsersActions.updateUserUser(updateContext));
  }*/

  getPaginatesUsers(state: ClrDatagridStateInterface) {
    this.store.dispatch(UsersActions.getPaginatedUsers({ state }));
  }


  getUserProfile() {
    this.store.dispatch(UsersActions.getUserProfile());
  }

  getUserById(userId: any) {
    this.store.dispatch(UsersActions.getUserById({ userId }));
  }

  getAllUsers() {
    this.store.dispatch(UsersActions.getAllUsers());
  }

  updateMyAccount(updateContext: any) {
    this.store.dispatch(UsersActions.updateMyAccount(updateContext));
  }

  updateUser(updateContext: any) {
    this.store.dispatch(UsersActions.updateUser(updateContext));
  }

  changeUserStatus(changeContext: any) {
    this.store.dispatch(UsersActions.changeUserStatus(changeContext));
  }

  assignUserRoles(userDetails: any) {
    this.store.dispatch(UsersActions.assignUserRoles(userDetails));
  }
}

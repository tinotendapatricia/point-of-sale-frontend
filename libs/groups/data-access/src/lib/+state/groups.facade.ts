import { Injectable, inject } from '@angular/core';
import { DatagridState } from '@pos-frontend/shared/utils';
import { select, Store, Action } from '@ngrx/store';

import * as GroupsActions from './groups.actions';
import { GroupsEntity } from './groups.models';
import * as GroupsFeature from './groups.reducer';
import * as GroupsSelectors from './groups.selectors';

@Injectable()
export class GroupsFacade {
  loaded$ = this.store.pipe(select(GroupsSelectors.selectGroupsLoaded));
  allGroups$ = this.store.pipe(select(GroupsSelectors.selectAllGroups));
  selectedGroup$ = this.store.pipe(select(GroupsSelectors.getSelectedGroup));
  loading$ = this.store.pipe(select(GroupsSelectors.getGroupsLoadingState));
  totalGroups$ = this.store.pipe(select(GroupsSelectors.getTotalGroups));
  btnState$ = this.store.pipe(select(GroupsSelectors.getBtnState));

  constructor(private store: Store<GroupsFeature.GroupsPartialState>) {}

  getPaginatedGroups(state: DatagridState) {
    this.store.dispatch(GroupsActions.getPaginatedGroups({ state }));
  }

  getAllGroups() {
    this.store.dispatch(GroupsActions.getAllGroups());
  }

  getGroup(groupId: string | number) {
    this.store.dispatch(GroupsActions.getGroupById({ groupId }));
  }

  createNewGroup(group: GroupsEntity) {
    this.store.dispatch(GroupsActions.createGroup(group));
  }

  updateGroup(group: GroupsEntity) {
    this.store.dispatch(GroupsActions.updateGroup(group));
  }

  assignGroupRoles(groupDetails: any) {
    this.store.dispatch(GroupsActions.assignGroupRoles(groupDetails));
  }
}

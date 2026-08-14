import { ClrLoadingState } from '@clr/angular';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as GroupsActions from './groups.actions';
import { GroupsEntity } from './groups.models';

export const GROUPS_FEATURE_KEY = 'groups';

export interface GroupsState extends EntityState<GroupsEntity> {
  selectedId?: string | number;
  loaded?: boolean;
  loading: boolean;
  error?: Error;
  selectedGroup: GroupsEntity | undefined;
  total: number;
  btnState: ClrLoadingState;
  currentPage: number;
}

export interface GroupsPartialState {
  readonly [GROUPS_FEATURE_KEY]: GroupsState;
}

export const groupsAdapter: EntityAdapter<GroupsEntity> =
  createEntityAdapter<GroupsEntity>();

export const initialGroupsState: GroupsState = groupsAdapter.getInitialState({
  loaded: false,
  loading: false,
  error: undefined,
  selectedGroup: undefined,
  total: 0,
  btnState: ClrLoadingState.DEFAULT,
  currentPage: 0,
});

const reducer = createReducer(
  initialGroupsState,
  on(
    GroupsActions.getGroupById,
    GroupsActions.getPaginatedGroups,
    GroupsActions.getAllGroups,
    (state) => ({
      ...state,
      loading: true,
    })
  ),

  on(GroupsActions.getGroupByIdSuccess, (state, { group }) => ({
    ...state,
    loading: false,
    loaded: true,
    selectedGroup: group,
  })),

  on(GroupsActions.getAllGroupsSuccess, (state, { groups }) =>
    groupsAdapter.setAll(groups, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),

  on(
    GroupsActions.getPaginatedGroupsSuccess,
    (state, { groups, total, page }) =>
      groupsAdapter.setAll(groups, {
        ...state,
        loading: false,
        loaded: true,
        total: total,
        currentPage: page,
      })
  ),

  on(
    GroupsActions.getAllGroupsFailure,
    GroupsActions.getGroupByIdFailure,
    GroupsActions.getPaginatedGroupsFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error,
    })
  ),

  on(
    GroupsActions.createGroup,
    GroupsActions.updateGroup,
    GroupsActions.deleteGroup,
    GroupsActions.assignGroupRoles,
    (state) => ({
      ...state,
      btnState: ClrLoadingState.LOADING,
      loaded: false,
      error: undefined,
    })
  ),

  on(
    GroupsActions.createGroupSuccess,
    GroupsActions.updateGroupSuccess,
    GroupsActions.deleteGroupSuccess,
    GroupsActions.assignGroupRolesSuccess,
    (state) => ({
      ...state,
      loaded: true,
      btnState: ClrLoadingState.SUCCESS,
    })
  ),

  on(
    GroupsActions.createGroupFailure,
    GroupsActions.updateGroupFailure,
    GroupsActions.deleteGroupFailure,
    GroupsActions.assignGroupRolesFailure,
    (state, { error }) => ({
      ...state,
      error: error,
      btnState: ClrLoadingState.ERROR,
    })
  )
);

export function groupsReducer(state: GroupsState | undefined, action: Action) {
  return reducer(state, action);
}

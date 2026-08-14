import { ClrLoadingState } from '@clr/angular';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { UsersEntity } from './users.models';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState extends EntityState<UsersEntity> {
  selectedId?: string | number;
  loaded?: boolean;
  loading: boolean;
  error?: Error;
  total: number;
  btnState: ClrLoadingState;
  selectedUser: UsersEntity | undefined;
  currentPage: number;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const usersAdapter: EntityAdapter<UsersEntity> =
  createEntityAdapter<UsersEntity>();

export const initialUsersState: UsersState = usersAdapter.getInitialState({
  loaded: false,
  loading: false,
  error: undefined,
  total: 0,
  btnState: ClrLoadingState.DEFAULT,
  selectedUser: undefined,
  currentPage: 0,
});

const reducer = createReducer(
  initialUsersState,
  on(
    UsersActions.createUser,
    UsersActions.createUser,
    UsersActions.updateMyAccount,
    UsersActions.updateUser,
    UsersActions.changeUserStatus,
    UsersActions.assignUserRoles,

    (state) => ({
      ...state,
      btnState: ClrLoadingState.SUCCESS,
      error: undefined,
      loaded: false,
    })
  ),

  on(
    UsersActions.getUserProfile,
    UsersActions.getUserById,
    UsersActions.getAllUsers,
    UsersActions.getPaginatedUsers,

    (state) => ({
      ...state,
      loading: true,
      error: undefined,
      loaded: false,
    })
  ),

  on(
    UsersActions.getUserProfileSuccess,
    UsersActions.getUserByIdSuccess,

    (state, { user }) => ({
      ...state,
      loading: false,
      error: undefined,
      loaded: true,
      selectedUser: user,
    })
  ),

  on(UsersActions.getAllUsersSuccess, (state, { users }) =>
    usersAdapter.setAll(users, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),

  on(
    UsersActions.getPaginatedUsersSuccess,

    (state, { users, total, page }) =>
      usersAdapter.setAll(users, {
        ...state,
        loading: false,
        loaded: true,
        total: total,
        currentPage: page,
      })
  ),

  on(
    UsersActions.getUserProfileFailure,
    UsersActions.getUserByIdFailure,
    UsersActions.getAllUsersFailure,
    UsersActions.getPaginatedUsersFailure,

    (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
      loaded: false,
    })
  ),

  on(
    UsersActions.createUserSuccess,
    UsersActions.updateMyAccountSuccess,
    UsersActions.updateUserSuccess,
    UsersActions.changeUserStatusSuccess,
    UsersActions.assignUserRolesSuccess,
    (state) => ({
      ...state,
      btnState: ClrLoadingState.SUCCESS,
      loaded: true,
    })
  ),

  on(
    UsersActions.createUserFailure,
    UsersActions.updateMyAccountFailure,
    UsersActions.updateUserFailure,
    UsersActions.changeUserStatusFailure,
    UsersActions.assignUserRolesFailure,
    (state) => ({
      ...state,
      btnState: ClrLoadingState.ERROR,
      loaded: false,
    })
  )
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}

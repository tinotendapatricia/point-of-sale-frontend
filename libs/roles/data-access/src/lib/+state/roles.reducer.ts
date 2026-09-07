import { LoadingState } from '@pos-frontend/shared/utils';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as RolesActions from './roles.actions';
import { RolesEntity } from './roles.models';

export const ROLES_FEATURE_KEY = 'roles';

export interface RolesState extends EntityState<RolesEntity> {
  selectedId?: string | number;
  loaded?: boolean;
  loading: boolean;
  error?: Error;
  selectedRole: RolesEntity | undefined;
  total: number;
  btnState: LoadingState;
  currentPage: number;
}

export interface RolesPartialState {
  readonly [ROLES_FEATURE_KEY]: RolesState;
}

export const rolesAdapter: EntityAdapter<RolesEntity> =
  createEntityAdapter<RolesEntity>();

export const initialRolesState: RolesState = rolesAdapter.getInitialState({
  loaded: false,
  loading: false,
  error: undefined,
  selectedRole: undefined,
  total: 0,
  btnState: LoadingState.DEFAULT,
  currentPage: 0,
});

const reducer = createReducer(
  initialRolesState,

  on(
    RolesActions.getRoleById,
    RolesActions.getPaginatedRoles,
    RolesActions.getAllRoles,
    (state) => ({
      ...state,
      loading: true,
    })
  ),

  on(RolesActions.getRoleByIdSuccess, (state, { role }) => ({
    ...state,
    loading: false,
    loaded: true,
    selectedRole: role,
  })),

  on(RolesActions.getAllRolesSuccess, (state, { roles }) =>
    rolesAdapter.setAll(roles, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),

  on(RolesActions.getPaginatedRolesSuccess, (state, { roles, total, page }) =>
    rolesAdapter.setAll(roles, {
      ...state,
      loading: false,
      loaded: true,
      total: total,
      currentPage: page,
    })
  ),

  on(
    RolesActions.getAllRolesFailure,
    RolesActions.getRoleByIdFailure,
    RolesActions.getPaginatedRolesFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error,
    })
  ),

  on(
    RolesActions.createRole,
    RolesActions.updateRole,
    RolesActions.deleteRole,
    (state) => ({
      ...state,
      btnState: LoadingState.LOADING,
      loaded: false,
      error: undefined,
    })
  ),

  on(
    RolesActions.createRoleSuccess,
    RolesActions.updateRoleSuccess,
    RolesActions.deleteRoleSuccess,
    (state) => ({
      ...state,
      loaded: true,
      btnState: LoadingState.SUCCESS,
    })
  ),

  on(
    RolesActions.createRoleFailure,
    RolesActions.updateRoleFailure,
    RolesActions.deleteRoleFailure,
    (state, { error }) => ({
      ...state,
      error: error,
      btnState: LoadingState.ERROR,
    })
  )
);

export function rolesReducer(state: RolesState | undefined, action: Action) {
  return reducer(state, action);
}

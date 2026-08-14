import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { ClrLoadingState } from '@clr/angular';

import * as AuthActions from './auth.actions';
import { AuthEntity } from './auth.models';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState extends EntityState<AuthEntity> {
  loaded?: boolean;
  loading: boolean;
  error?: any;
  bthState: ClrLoadingState;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const authAdapter: EntityAdapter<AuthEntity> =
  createEntityAdapter<AuthEntity>();

export const initialAuthState: AuthState = authAdapter.getInitialState({
  loaded: false,
  loading: false,
  error: undefined,
  bthState: ClrLoadingState.DEFAULT,
});

const reducer = createReducer(
  initialAuthState,
  on(
    AuthActions.clientLogin,
    AuthActions.adminLogin,
    AuthActions.register,
    (state) => ({
      ...state,
      loaded: false,
      loading: true,
      bthState: ClrLoadingState.LOADING,
      error: undefined,
    })
  ),

  on(
    AuthActions.clientLoginSuccess,
    AuthActions.adminLoginSuccess,
    AuthActions.registerSuccess,
    (state) => ({
      ...state,
      loading: false,
      loaded: true,
      error: undefined,
      bthState: ClrLoadingState.SUCCESS,
    })
  ),

  on(
    AuthActions.clientLoginFailure,
    AuthActions.adminLoginFailure,
    AuthActions.registerFailure,
    (state) => ({
      ...state,
      loading: false,
      loaded: false,
      error: true,
      bthState: ClrLoadingState.ERROR,
    })
  )
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}

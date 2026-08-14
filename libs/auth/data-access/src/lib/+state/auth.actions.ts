import { createAction, props } from '@ngrx/store';
import { AuthEntity } from './auth.models';

import { HttpErrorResponse } from '@angular/common/http';

export const clientLogin = createAction(
  '[Auth/API] Client Login',
  props<{ credentials: AuthEntity }>()
);

export const clientLoginSuccess = createAction(
  '[Auth/API] Client Login Success',
  props<{ token: any }>()
);

export const clientLoginFailure = createAction(
  '[Auth/API] Client Login Failure',
  props<{ error: HttpErrorResponse }>()
);

export const adminLogin = createAction(
  '[Auth/API] Admin Login',
  props<{ credentials: AuthEntity }>()
);

export const adminLoginSuccess = createAction(
  '[Auth/API] Admin Login Success',
  props<{ token: any }>()
);

export const adminLoginFailure = createAction(
  '[Auth/API] Admin Login Failure',
  props<{ error: HttpErrorResponse }>()
);

export const register = createAction(
  '[Auth/Register] Register New Member',
  props<{ credentials: any }>()
);

export const registerSuccess = createAction(
  '[Auth/Register] Register Success',
  props<{ token: AuthEntity }>()
);

export const registerFailure = createAction(
  '[Auth/Register] Register Failure',
  props<{ error: HttpErrorResponse }>()
);

export const Logout = createAction('[Auth/API] Logout');

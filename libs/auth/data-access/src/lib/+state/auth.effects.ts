import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { Utilities } from '@pos-frontend/shared/utils';

import { AuthenticationService } from '../services/authentication.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  clientLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.clientLogin),
      exhaustMap((action) => {
        return this.authService.clientLogin(action.credentials).pipe(
          map((token) => {
            return AuthActions.clientLoginSuccess({ token });
          }),
          catchError((error) => {
            return of(AuthActions.clientLoginFailure({ error }));
          })
        );
      })
    )
  );

  adminLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.adminLogin),
      exhaustMap((action) => {
        return this.authService.adminLogin(action.credentials).pipe(
          map((token) => {
            return AuthActions.adminLoginSuccess({ token });
          }),
          catchError((error) => {
            return of(AuthActions.adminLoginFailure({ error }));
          })
        );
      })
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap((action) => {
        return this.authService.register(action.credentials).pipe(
          map((token) => {
            return AuthActions.registerSuccess({ token });
          }),
          catchError((error) => {
            return of(AuthActions.registerFailure({ error }));
          })
        );
      })
    )
  );

  logoutUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.Logout),
        tap(() => {
          this.authService.logout();
          this.router.navigate(['auth/login']);
        })
      ),
    { dispatch: false }
  );

  onLoginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.adminLoginFailure, AuthActions.clientLoginFailure),
        tap((action) => {
          if (action.error.status === HttpStatusCode.Unauthorized)
            Utilities.displayToast(
              'error',
              action.error.error.message
                ? action.error.error.message
                : 'Unauthorized'
            );
        })
      ),
    { dispatch: false }
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.clientLoginSuccess, AuthActions.adminLoginSuccess),
        tap((action) => {
          this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

          sessionStorage.setItem('accessToken', action.token.token);
          sessionStorage.setItem('userId', action.token.userId);
          this.router.navigate(['']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  returnUrl: any;
}

import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import * as AuthFeature from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

@Injectable()
export class AuthFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(AuthSelectors.selectAuthLoaded));
  authBtnState$ = this.store.pipe(select(AuthSelectors.getAuthBtnState));
  loading$ = this.store.pipe(select(AuthSelectors.getAuthBtnState));

  //constructor(private store: Store<AuthFeature.AuthPartialState>) {}

  clientLogin(credentials: any) {
    this.store.dispatch(AuthActions.clientLogin({ credentials }));
  }

  adminLogin(credentials: any) {
    this.store.dispatch(AuthActions.adminLogin({ credentials }));
  }

  logout() {
    this.store.dispatch(AuthActions.Logout());
  }

  isLoggedIn(): boolean {
    return Boolean(
      sessionStorage.getItem('accessToken') &&
        sessionStorage.getItem('isAuthenticated')
    );
  }

  register(credentials: any) {
    this.store.dispatch(AuthActions.register({ credentials }));
  }
}

import { inject } from '@angular/core';
import { type CanActivateFn, Router } from '@angular/router';

/** Sends users without a session token to the login page. */
export const authGuard: CanActivateFn = (_route, state) => {
  if (sessionStorage.getItem('accessToken')) {
    return true;
  }
  sessionStorage.clear();
  return inject(Router).createUrlTree(['auth/login'], {
    queryParams: { returnUrl: state.url },
  });
};

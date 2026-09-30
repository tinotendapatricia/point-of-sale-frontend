import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  type RouterStateSnapshot,
  UrlTree,
  provideRouter,
} from '@angular/router';

import { authGuard } from './auth.guard';

const route = new ActivatedRouteSnapshot();
// Only `url` is read by the guard.
const state = { url: '/products' } as unknown as RouterStateSnapshot;

describe('authGuard', () => {
  const run = () =>
    TestBed.runInInjectionContext(() =>
      authGuard(route, state)
    );

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('allows navigation with a token', () => {
    sessionStorage.setItem('accessToken', 't');
    expect(run()).toBe(true);
  });

  it('redirects to login without a token', () => {
    const result = run();
    expect(result).toBeInstanceOf(UrlTree);
    expect(String(result)).toBe('/auth/login?returnUrl=%2Fproducts');
  });
});

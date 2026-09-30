import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ApiService } from '@pos-frontend/shared/data-access';
import { of } from 'rxjs';

import { AuthenticationService } from './auth.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  const api = { post: jest.fn(() => of({ token: 't', userId: 1 })) };
  const router = { navigate: jest.fn(() => Promise.resolve(true)) };
  const credentials = { username: 'u', password: 'p' };

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: api },
        { provide: Router, useValue: router },
      ],
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('adminLogin posts to /auth/login', () => {
    service.adminLogin(credentials);
    expect(api.post).toHaveBeenCalledWith('/auth/login', credentials);
  });

  it('clientLogin clears the session and posts to /authenticate', () => {
    sessionStorage.setItem('stale', 'x');
    service.clientLogin(credentials);
    expect(sessionStorage.getItem('stale')).toBeNull();
    expect(api.post).toHaveBeenCalledWith('/authenticate', credentials);
  });

  it('register posts to /register', () => {
    service.register(credentials);
    expect(api.post).toHaveBeenCalledWith('/register', credentials);
  });

  it('saveSession stores the token in sessionStorage', () => {
    service.saveSession({ token: 'abc', userId: 7 });
    expect(sessionStorage.getItem('accessToken')).toBe('abc');
    expect(service.getUserId()).toBe('7');
    expect(service.isLoggedIn()).toBe(true);
  });

  it('logout clears the session and navigates to login', () => {
    service.saveSession({ token: 'abc', userId: 7 });
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['auth', 'login']);
  });
});

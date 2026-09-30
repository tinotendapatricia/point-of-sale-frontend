import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '@pos-frontend/shared/data-access';

import {
  type LoginCredentials,
  type LoginResponse,
  type RegisterRequest,
} from './auth.model';

const TOKEN_KEY = 'accessToken';
const USER_ID_KEY = 'userId';

/**
 * Auth endpoints plus the session helpers. The token lives in sessionStorage,
 * which the token interceptor in @pos-frontend/core reads.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);

  adminLogin(credentials: LoginCredentials) {
    return this.apiService.post<LoginResponse>(`/auth/login`, credentials);
  }

  clientLogin(credentials: LoginCredentials) {
    sessionStorage.clear();
    return this.apiService.post<LoginResponse>(`/authenticate`, credentials);
  }

  register(details: RegisterRequest) {
    return this.apiService.post<LoginResponse>(`/register`, details);
  }

  saveSession({ token, userId }: LoginResponse): void {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_ID_KEY, String(userId));
  }

  getUserId(): string | undefined {
    return sessionStorage.getItem(USER_ID_KEY) ?? undefined;
  }

  isLoggedIn(): boolean {
    return Boolean(sessionStorage.getItem(TOKEN_KEY));
  }

  logout(): void {
    sessionStorage.clear();
    void this.router.navigate(['auth', 'login']);
  }
}

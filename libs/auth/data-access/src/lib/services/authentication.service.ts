import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '@pos-frontend/shared/data-access';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private apiService: ApiService,
    private readonly router: Router
  ) {}

  clientLogin(credentials: any) {
    sessionStorage.clear();
    return this.apiService.post<any>(`/authenticate`, credentials);
  }

  adminLogin(credentials: any) {
    return this.apiService.post<any>(`/auth/login`, credentials);
  }

  register(credentials: any) {
    return this.apiService.post<any>(`/register`, credentials);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['auth', 'login']).then();
  }
}

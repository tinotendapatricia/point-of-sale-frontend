import { Injectable } from '@angular/core';
import { CreateUserContext, UsersEntity } from '../+state/users.models';

import { ApiService, Page } from '@pos-frontend/shared/data-access';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private apiService: ApiService) {}

  createUser(user: CreateUserContext) {
    return this.apiService.post<UsersEntity>(`/users/create`, user);
  }
  getUserProfile() {
    return this.apiService.get<UsersEntity>(`/users/my-account`);
  }

  getUserById(userId: any) {
    return this.apiService.get<UsersEntity>(`/users/by-id/${userId}`);
  }

  getClientUserProfile() {
    return this.apiService.get<any>(`/client/v1/users/profile`);
  }

  changeUserStatus(context: any) {
    const http = new HttpParams().set('status', context.status);
    return this.apiService.patch<UsersEntity>(
      `/v1/users/${context.userId}`,
      {},
      http
    );
  }

  updateMyAccount(updateContext: any) {
    return this.apiService.put<any>('/v1/accounts/my-account', updateContext);
  }

  getAllUsers() {
    return this.apiService.get<UsersEntity[]>(`/users/all`);
  }

  getPaginatedUsers(filters?: any) {
    const httpParams = new HttpParams({ fromObject: filters });
    return this.apiService.get<Page<UsersEntity>>(
      `/users/paginated`,
      httpParams
    );
  }


  updateUser(updateUserContext: any) {
    return this.apiService.put<any>(
      '/users/update',
      updateUserContext
    );
  }

  assignUserRoles(userDetails: any) {
    return this.apiService.put<UsersEntity>(
      `/users/assign-roles/${userDetails.userId}`,
      userDetails
    );
  }
}

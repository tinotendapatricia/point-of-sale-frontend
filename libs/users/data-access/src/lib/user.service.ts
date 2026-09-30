import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ApiService,
  type Page,
  toHttpParams,
} from '@pos-frontend/shared/data-access';

import {
  type AssignUserRolesRequest,
  type ChangeUserStatusRequest,
  type CreateUserContext,
  type UpdateMyAccountRequest,
  type UpdateUserRequest,
  type UserFilters,
  type UsersEntity,
} from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiService = inject(ApiService);

  getPaginatedUsers(filters?: UserFilters) {
    return this.apiService.get<Page<UsersEntity>>(
      `/users/paginated`,
      toHttpParams(filters)
    );
  }

  createUser(details: CreateUserContext) {
    return this.apiService.post<UsersEntity>(`/users/create`, details);
  }

  changeUserStatus(details: ChangeUserStatusRequest) {
    return this.apiService.patch<UsersEntity>(
      `/v1/users/${details.userId}`,
      {},
      new HttpParams().set('status', String(details.status))
    );
  }

  assignUserRoles(details: AssignUserRolesRequest) {
    return this.apiService.put<UsersEntity>(
      `/users/assign-roles/${details.userId}`,
      details
    );
  }

  getUser(id: string | number) {
    return this.apiService.get<UsersEntity>(`/users/by-id/${id}`);
  }

  getUserProfile() {
    return this.apiService.get<UsersEntity>(`/users/my-account`);
  }

  getClientUserProfile() {
    // TODO: confirm response shape with backend (assumed to be a user)
    return this.apiService.get<UsersEntity>(`/client/v1/users/profile`);
  }

  updateUser(details: UpdateUserRequest) {
    return this.apiService.put<UsersEntity>(`/users/update`, details);
  }

  updateMyAccount(details: UpdateMyAccountRequest) {
    return this.apiService.put<UsersEntity>(`/v1/accounts/my-account`, details);
  }

  getAllUsers() {
    return this.apiService.get<UsersEntity[]>(`/users/all`);
  }
}

import { Injectable, inject } from '@angular/core';
import {
  ApiService,
  type Page,
  toHttpParams,
} from '@pos-frontend/shared/data-access';

import {
  type CreateRoleRequest,
  type RoleFilters,
  type RolesEntity,
  type UpdateRoleRequest,
} from './role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly apiService = inject(ApiService);

  getPaginatedRoles(filters?: RoleFilters) {
    return this.apiService.get<Page<RolesEntity>>(
      `/v1/roles`,
      toHttpParams(filters)
    );
  }

  createRole(details: CreateRoleRequest) {
    return this.apiService.post<RolesEntity>(`/v1/roles`, details);
  }

  getRole(id: string | number) {
    return this.apiService.get<RolesEntity>(`/v1/roles/${id}`);
  }

  updateRole(details: UpdateRoleRequest) {
    return this.apiService.put<RolesEntity>(`/v1/roles/${details.id}`, details);
  }

  deleteRole(id: string | number) {
    return this.apiService.delete<unknown>(`/v1/roles/${id}`);
  }

  getAllRoles() {
    return this.apiService.get<RolesEntity[]>(`/roles/all`);
  }
}

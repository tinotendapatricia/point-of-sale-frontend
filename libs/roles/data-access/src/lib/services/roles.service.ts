import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService, Page } from '@pos-frontend/shared/data-access';
import { RolesEntity } from '../+state/roles.models';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private apiService: ApiService) {}

  getPaginatedRoles(filters?: any) {
    const httpParams = new HttpParams({ fromObject: filters });
    return this.apiService.get<Page<RolesEntity>>(`/v1/roles`, httpParams);
  }

  createRole(roleDetails: RolesEntity) {
    return this.apiService.post<RolesEntity>(`/v1/roles`, roleDetails);
  }

  getRole(roleId: string | number) {
    return this.apiService.get<RolesEntity>(`/v1/roles/${roleId}`);
  }

  updateRole(roleDetails: RolesEntity) {
    return this.apiService.put<RolesEntity>(
      `/v1/roles/${roleDetails.id}`,
      roleDetails
    );
  }

  deleteRole(roleId: string | number) {
    return this.apiService.delete(`/v1/roles/${roleId}`);
  }

  getAllRoles() {
    return this.apiService.get<RolesEntity[]>(`/roles/all`);
  }
}

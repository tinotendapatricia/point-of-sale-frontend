import { Injectable, inject } from '@angular/core';
import {
  ApiService,
  type Page,
  toHttpParams,
} from '@pos-frontend/shared/data-access';

import {
  type AssignGroupRolesRequest,
  type CreateGroupRequest,
  type GroupFilters,
  type GroupsEntity,
  type UpdateGroupRequest,
} from './group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private readonly apiService = inject(ApiService);

  getPaginatedGroups(filters?: GroupFilters) {
    return this.apiService.get<Page<GroupsEntity>>(
      `/groups/list`,
      toHttpParams(filters)
    );
  }

  createGroup(details: CreateGroupRequest) {
    return this.apiService.post<GroupsEntity>(`/groups/create`, details);
  }

  assignGroupRoles(details: AssignGroupRolesRequest) {
    return this.apiService.put<GroupsEntity>(
      `/groups/assign-roles/${details.groupId}`,
      details
    );
  }

  getGroup(id: string | number) {
    return this.apiService.get<GroupsEntity>(`/groups/${id}`);
  }

  updateGroup(details: UpdateGroupRequest) {
    // Path kept exactly as the existing backend call ("rupdate").
    return this.apiService.put<GroupsEntity>(
      `/groups/rupdate/${details.id}`,
      details
    );
  }

  deleteGroup(id: string | number) {
    return this.apiService.delete<unknown>(`/groups/${id}`);
  }

  getAllGroups() {
    return this.apiService.get<GroupsEntity[]>(`/groups/all`);
  }
}

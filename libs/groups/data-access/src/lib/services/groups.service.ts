import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService, Page } from '@pos-frontend/shared/data-access';
import { GroupsEntity } from '../+state/groups.models';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private apiService: ApiService) {}

  getPaginatedGroups(filters?: any) {
    const httpParams = new HttpParams({ fromObject: filters });
    return this.apiService.get<Page<GroupsEntity>>(`/groups/list`, httpParams);
  }

  createGroup(groupDetails: GroupsEntity) {
    return this.apiService.post<GroupsEntity>(`/groups/create`, groupDetails);
  }

  getGroup(groupId: string | number) {
    return this.apiService.get<GroupsEntity>(`/groups/${groupId}`);
  }

  updateGroup(groupDetails: GroupsEntity) {
    return this.apiService.put<GroupsEntity>(
      `/groups/rupdate/${groupDetails.id}`,
      groupDetails
    );
  }

  assignGroupRoles(groupDetails: any) {
    return this.apiService.put<GroupsEntity>(
      `/groups/assign-roles/${groupDetails.groupId}`,
      groupDetails
    );
  }

  deleteGroup(groupId: string | number) {
    return this.apiService.delete(`/groups/${groupId}`);
  }

  getAllGroups() {
    return this.apiService.get<GroupsEntity[]>(`/groups/all`);
  }
}

import { type BaseEntity } from '@pos-frontend/core';
import { type RolesEntity } from '@pos-frontend/roles/data-access';

export interface GroupsEntity extends BaseEntity {
  id: string;
  name: string;
  roles: RolesEntity[];
}

export interface GroupFilters {
  page?: number;
  size?: number;
}

export interface CreateGroupRequest {
  // TODO: confirm fields with backend
  name: string;
}

export interface UpdateGroupRequest {
  // TODO: confirm fields with backend
  id: string | number;
  name: string;
}

export interface AssignGroupRolesRequest {
  groupId: string | number;
  /** Role ids. */
  roles: string[];
}

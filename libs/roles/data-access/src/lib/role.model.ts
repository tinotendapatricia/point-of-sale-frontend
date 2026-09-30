export interface RolesEntity {
  id: string;
  name: string;
  createdBy: string;
}

export interface RoleFilters {
  page?: number;
  size?: number;
}

export interface CreateRoleRequest {
  // TODO: confirm fields with backend
  name: string;
}

export interface UpdateRoleRequest {
  // TODO: confirm fields with backend
  id: string | number;
  name: string;
}

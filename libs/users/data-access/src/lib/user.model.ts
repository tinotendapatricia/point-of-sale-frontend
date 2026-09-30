import { type RolesEntity } from '@pos-frontend/roles/data-access';

// Audit fields use the backend's `createdDate`/`lastModifiedDate` names, so this
// entity does not extend BaseEntity.
export interface UsersEntity {
  id: number;
  username: string;
  name: string;
  active: boolean;
  locked: boolean;
  roles: RolesEntity[];
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  version: number;
}

export interface UserFilters {
  page?: number;
  size?: number;
  /** Group id, for listing a single group's users. TODO: confirm param name with backend */
  group?: string | number;
}

export interface CreateUserContext {
  // TODO: confirm fields with backend (the admin user form sends username, name and password)
  username: string;
  name: string;
  password: string;
  group?: number;
  lastName?: string;
}

export interface UpdateUserRequest {
  // TODO: confirm fields with backend (mirrors the user form value)
  id: string | number;
  username: string;
  name: string;
  password?: string;
}

export interface UpdateMyAccountRequest {
  // TODO: confirm fields with backend
  username?: string;
  name?: string;
  password?: string;
}

export interface ChangeUserStatusRequest {
  userId: string | number;
  status: boolean;
}

export interface AssignUserRolesRequest {
  userId: string | number;
  /** Role ids. */
  roles: string[];
}

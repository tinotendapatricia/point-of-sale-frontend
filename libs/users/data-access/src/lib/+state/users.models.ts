import { RolesEntity } from '@pos-frontend/roles/data-access';

export interface UsersEntity {
  createdBy: string;
  createdDate: string;
  locked: boolean;
  active: boolean;
  name: string;
  roles: RolesEntity[];
  id: number;
  lastModifiedBy: string;
  lastModifiedDate: string;

  username: string;
  version: number;
}

export interface CreateUserContext {
  username: string;
  name: string;
  group: number;
  lastName: string;
}

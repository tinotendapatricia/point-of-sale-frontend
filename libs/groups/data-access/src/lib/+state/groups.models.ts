import { RolesEntity } from '@pos-frontend/roles/data-access';

/**
 * Interface for the 'Groups' data
 */
export interface GroupsEntity {
  id: string;
  name: string;
  roles: RolesEntity[];
  createdBy: string;
  updatedBy: string;
  createdAt: any;
  updatedAt: any;
}

import { type BaseEntity } from '@pos-frontend/core';

export interface CategoryEntity extends BaseEntity {
  name: string;
  code: string;
}

export interface CategoryFilters {
  page?: number;
  size?: number;
  search?: string;
  sort?: string;
  order?: 'ASC' | 'DESC';
}

/** POST /categories/create body: the user-editable fields only. */
export type CreateCategoryRequest = Pick<CategoryEntity, 'name' | 'code'>;

// TODO: confirm fields with backend
export interface AssignCategoryRolesRequest {
  categoryId: string | number;
  roleIds: (string | number)[];
}

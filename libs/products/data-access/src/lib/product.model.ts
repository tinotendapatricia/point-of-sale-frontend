import { type BaseEntity } from '@pos-frontend/core';

export interface ProductsEntity extends BaseEntity {
  name: string;
  code: string;
  barcode: string;
  active: boolean;
  price: Period[];
  cost: Period[];
  taxable: string;
  quantity: number;
  reorderLevel: number;
  mass: string;
  measuredIn: string;
}

interface Period {
  value: number;
  effectiveDate: Date;
}

export interface ProductFilters {
  page?: number;
  size?: number;
  search?: string;
  sort?: string;
  order?: 'ASC' | 'DESC';
}

/** POST /products/create/ body: the user-editable fields only. */
export type CreateProductRequest = Pick<
  ProductsEntity,
  'name' | 'code' | 'barcode' | 'active'
>;

// TODO: confirm fields with backend
export interface BreakProductRequest {
  parentId: string | number;
  childId: string | number;
  quantity: number;
  parentSize: number;
}

// TODO: confirm fields with backend
export interface UpdateCostRequest {
  id: string | number;
  cost: number;
  effectiveDate: string;
}

// TODO: confirm fields with backend
export interface UpdatePriceRequest {
  id: string | number;
  price: number;
  effectiveDate: string;
}

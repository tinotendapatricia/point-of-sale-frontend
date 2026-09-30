// Reference model file (<singular>.model.ts). Add only the types that don't already exist.
import type { BaseEntity } from '@pos-frontend/core';

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

/** Query filters for the paginated endpoint. Every field is optional. */
export interface ProductFilters {
  page?: number;
  size?: number;
  search?: string;
}

/** Payload types for endpoints that don't take the full entity. */
export interface UpdateCostRequest {
  id: number;
  value: number; // TODO: confirm fields with backend
  effectiveDate: string;
}

export interface UpdatePriceRequest {
  id: number;
  value: number; // TODO: confirm fields with backend
  effectiveDate: string;
}

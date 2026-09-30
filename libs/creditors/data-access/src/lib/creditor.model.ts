import { type BaseEntity } from '@pos-frontend/core';

export interface CreditorsEntity extends BaseEntity {
  name: string;
  account: string;
  contact: string;
  address: string;
  // TODO: confirm with backend; the creditor form has always sent it.
  description?: string;
}

export interface CreditorFilters {
  page?: number;
  size?: number;
  /** Comma-separated `property:value` pairs. */
  search?: string;
  sort?: string;
  order?: 'ASC' | 'DESC';
}

export interface AssignCreditorRolesRequest {
  creditorId: string | number;
  // TODO: confirm fields with backend
  roles?: (string | number)[];
}

/** Create payload: the fields the creditor form edits, no id or audit fields. */
export interface CreditorRequest {
  name: string;
  account: string;
  address: string;
  contact?: string;
  description?: string;
}

export interface UpdateCreditorRequest extends CreditorRequest {
  id: string | number;
}

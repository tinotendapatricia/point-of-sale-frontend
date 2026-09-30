import { type BaseEntity } from '@pos-frontend/core';

/** Exchange rate period attached to a debtor's currency. */
export interface DebtorCurrencyRate {
  value: number;
  effectiveDate: string;
}

/** Currency as embedded in a debtor response (rate is a list of periods). */
export interface DebtorCurrency {
  id: string | number;
  name: string;
  code?: string;
  symbol?: string;
  rate: DebtorCurrencyRate[];
}

export interface DebtorsEntity extends BaseEntity {
  name: string;
  account: string;
  discount: number;
  currency: DebtorCurrency;
}

/** Create/update payload: the debtor form sends the currency id, not the object. */
export interface DebtorRequest {
  id?: string | number;
  name: string;
  account: string;
  discount: number;
  currency: string | number;
}

export interface UpdateDebtorRequest extends DebtorRequest {
  id: string | number;
}

export interface AssignDebtorRolesRequest {
  debtorId: string | number;
  // TODO: confirm fields with backend (legacy scaffold endpoint, no UI uses it)
  roles: (string | number)[];
}

export interface DebtorFilters {
  page?: number;
  size?: number;
  /** Comma separated `property:value` pairs. */
  search?: string;
  sort?: string;
  order?: 'ASC' | 'DESC';
}

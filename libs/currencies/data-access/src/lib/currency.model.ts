import { type BaseEntity } from '@pos-frontend/core';

export interface CurrencyEntity extends BaseEntity {
  code: string;
  name: string;
  symbol: string;
  rate: number;
  isDefault: boolean;
}

export interface CurrencyFilters {
  page?: number;
  size?: number;
  search?: string;
  sort?: string;
  order?: 'ASC' | 'DESC';
}

/** POST /currencies/create body: the user-editable fields plus the default flag. */
export type CreateCurrencyRequest = Pick<
  CurrencyEntity,
  'name' | 'code' | 'symbol' | 'isDefault'
>;

/** PATCH /currencies/default/:id has no body; only the id is used. */
export type MakeDefaultCurrencyRequest = Pick<CurrencyEntity, 'id'>;

// TODO: confirm fields with backend
export interface UpdateRateRequest {
  id: string | number;
  rate: number;
  effectiveDate: string;
}

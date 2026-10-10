import { type CreateSaleRequest } from '../lib/pos.model';

/** Shared test data for the pos data-access specs. */
export const saleRequest: CreateSaleRequest = {
  products: [],
  totalAmountExcVat: 10,
  totalVat: 0,
  total: 10,
  debtor: 1,
  station: '1',
  rate: 1,
  transactionType: 1,
  reference: null,
  changeDebtor: null,
  changeRate: null,
  changeAmount: null,
};

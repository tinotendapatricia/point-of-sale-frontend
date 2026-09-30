import { type CreateSaleRequest, type PosEntity } from '../lib/+state/pos.models';

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
  reference: '',
  changeDebtor: null,
  changeRate: null,
  changeAmount: null,
};

export const createInvoice = (id: string | number = 1): PosEntity => ({
  id,
  invoiceNumber: 42,
  totalAmountExcVat: '10',
  totalVat: '0',
  total: '10',
  debtor: {
    id: 1,
    name: 'Cash',
    account: 'CASH',
    discount: 0,
    currency: { id: 1, name: 'US Dollar', rate: [] },
    createdAt: '',
    updatedAt: '',
  },
  createdBy: 'admin',
  createdAt: new Date(0),
  updatedAt: new Date(0),
  products: [],
});

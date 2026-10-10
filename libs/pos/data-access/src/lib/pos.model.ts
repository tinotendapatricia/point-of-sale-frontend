import { type BaseEntity } from '@pos-frontend/core';
import { type DebtorsEntity } from '@pos-frontend/debtors/data-access';

/** An invoice (sale or refund) as returned by `/invoices/create`. */
export interface PosEntity extends BaseEntity {
  invoiceNumber: number;
  totalAmountExcVat: string;
  totalVat: string;
  total: string;
  debtor: DebtorsEntity;
  products: SaleProducts[];
}

export interface SaleProducts {
  product: string;
  description: string;
  quantity: number;
  price: string;
}

/** One line on the till before the sale is submitted. */
export interface SaleItem {
  code: string;
  description: string;
  productId: string | number;
  quantity: number;
  price: number;
  cost: number;
  totalAmt: number;
}

/** 1 = sale, 2 = refund. */
export type TransactionType = 1 | 2;

/** POST `/invoices/create` body, built by the till form. */
export interface CreateSaleRequest {
  products: SaleItem[];
  totalAmountExcVat: number;
  totalVat: number;
  total: number;
  debtor: string | number;
  station: string | null;
  rate: number;
  transactionType: TransactionType;
  /** Optional free-text reference; null when the cashier leaves it blank. */
  reference: string | null;
  changeDebtor: string | number | null;
  changeRate: number | null;
  changeAmount: number | null;
}

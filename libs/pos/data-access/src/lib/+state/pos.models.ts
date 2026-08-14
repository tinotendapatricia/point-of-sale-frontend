import { DebtorsEntity } from '@pos-frontend/debtors/data-access';

export interface PosEntity {
  id: string | number; // Primary ID
  invoiceNumber:number
  totalAmountExcVat: string;
  totalVat: string;
  total: string;
  debtor: DebtorsEntity;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  products: SaleProducts[];
}

export interface SaleProducts {
  product: string;
  description: string;
  quantity: number;
  price: string;
}

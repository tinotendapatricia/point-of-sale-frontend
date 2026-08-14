import { CreditorsEntity } from '@pos-frontend/creditors/data-access';
import { ProductsEntity } from '@pos-frontend/products/data-access';

/**
 * Interface for the 'PurchaseOrder' data
 */
export interface PurchaseOrderEntity {
  orderNumber: string;
  date: Date;
  received: boolean;
  creditor: CreditorsEntity;
  amountBeforeVat: number;
  vatAmount: number;
  amountAfterVat: number;
  products: PurchaseOrderProducts[];
  id: string;
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
}

export interface PurchaseOrderProducts {
  product: ProductsEntity;
  quantityPurchased: number;
  quantityReceived: number;
  received: boolean;
  variance: number;
  purchasedBy: string;
  receivedBy: string;
}

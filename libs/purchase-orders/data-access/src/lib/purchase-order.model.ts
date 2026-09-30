import { type BaseEntity } from '@pos-frontend/core';
import { type CreditorsEntity } from '@pos-frontend/creditors/data-access';
import { type ProductsEntity } from '@pos-frontend/products/data-access';

export interface PurchaseOrderEntity extends BaseEntity {
  orderNumber: string;
  date: Date;
  received: boolean;
  creditor: CreditorsEntity;
  amountBeforeVat: number;
  vatAmount: number;
  amountAfterVat: number;
  products: PurchaseOrderProducts[];
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

export interface PurchaseOrderFilters {
  page?: number;
  size?: number;
  /** Comma-separated `property:value` pairs. */
  search?: string;
  sort?: string;
  order?: 'ASC' | 'DESC';
}

/** One product line on a new purchase order (as built by the purchase-order form). */
export interface PurchaseOrderLineRequest {
  product: string | number;
  code: string;
  description: string;
  quantityPurchased: number;
  quantity: number;
  cost: number;
  value: number;
}

export interface CreatePurchaseOrderRequest {
  creditor: string | number;
  totalAmount: number;
  totalQty: number;
  reference: string;
  products: PurchaseOrderLineRequest[];
}

/**
 * One line of a purchase order as returned by `/purchase-orders/:orderNumber`,
 * i.e. what can still be received against it.
 */
export interface PurchaseOrderReceivableLine {
  // TODO: confirm fields with backend
  product?: string | number;
  name: string;
  quantity: number;
  amount: number;
}

/** One received product line on a goods-received voucher. */
export interface ReceivedProductLine extends PurchaseOrderReceivableLine {
  qtyReceived: number;
  unitCost: number;
  receivedValue: number;
}

export interface ReceivePurchaseOrderRequest {
  purchaseOrderNumber: string | number;
  totalAmount: number;
  totalQty: number;
  reference: string;
  products: ReceivedProductLine[];
}

export interface AssignPurchaseOrderRolesRequest {
  creditorId: string | number;
  // TODO: confirm fields with backend
  roles?: (string | number)[];
}

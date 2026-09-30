// TODO: confirm fields with backend
export interface RecentTransaction {
  invoiceNumber: string;
  totalAmount: number;
  debtorAccount: string;
  debtorName: string;
}

// TODO: confirm fields with backend
export interface ProductSales {
  name: string;
  quantitySold: number;
}

// TODO: confirm fields with backend
export interface LowStockProduct {
  name: string;
  quantity: number;
  reorderLevel: number;
}

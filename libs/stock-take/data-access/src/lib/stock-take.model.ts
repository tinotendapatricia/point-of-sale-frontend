export interface StockTakeBatch {
  batchNumber: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

/** A product counted into a batch, as built by the stock-take form. */
export interface StockTakeBatchItem {
  id: string | number;
  code: string;
  productName: string;
  quantity: number;
}

export interface AddProductsToBatchRequest {
  batchNumber: number;
  products: StockTakeBatchItem[];
}

/** A counted product as returned by `/stock-take/get-batch-products/:batchNumber`. */
export interface StockTakeBatchProduct {
  productId: string | number;
  quantity: number;
  stockBatch: number;
}

export interface CountedStockItem {
  product: string | number;
  quantity: number;
  adjustedOnBatch: number;
}

export interface AdjustedStockValue {
  productId: string | number;
  name: string;
  batchCount: number;
  systemCount: number;
  variance: number;
}

export interface AdjustStockRequest {
  batchNumber: number;
  values: CountedStockItem[];
  adjustedValues: AdjustedStockValue[];
}

export interface StockAdjustmentResponse {
  // TODO: confirm fields with backend
  adjustment: { number: string | number };
}

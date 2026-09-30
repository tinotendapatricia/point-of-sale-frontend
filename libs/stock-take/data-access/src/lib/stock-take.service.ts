import { Injectable, inject } from '@angular/core';
import { ApiService } from '@pos-frontend/shared/data-access';

import {
  type AddProductsToBatchRequest,
  type AdjustStockRequest,
  type StockAdjustmentResponse,
  type StockTakeBatch,
  type StockTakeBatchProduct,
} from './stock-take.model';

@Injectable({
  providedIn: 'root',
})
export class StockTakeService {
  private readonly apiService = inject(ApiService);

  createStockTakeBatch() {
    return this.apiService.post<StockTakeBatch>(`/stock-take/create`, {});
  }

  addProductsToBatch(details: AddProductsToBatchRequest) {
    return this.apiService.post<unknown>(
      `/stock-take/add-product-to-batch`,
      details
    );
  }

  adjustStock(details: AdjustStockRequest) {
    return this.apiService.post<StockAdjustmentResponse>(
      `/stock-adjustment/adjust`,
      details
    );
  }

  getBatchProducts(batchNumber: number) {
    return this.apiService.get<StockTakeBatchProduct[]>(
      `/stock-take/get-batch-products/${batchNumber}`
    );
  }
}

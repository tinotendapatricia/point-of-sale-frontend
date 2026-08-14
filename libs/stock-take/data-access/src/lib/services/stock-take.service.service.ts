import { Injectable } from '@angular/core';
import { StockTakeBatch } from '../models/stock-take.model';
import { ApiService } from '@pos-frontend/shared/data-access';

@Injectable({
  providedIn: 'root'
})
export class StockTakeServiceService {
  constructor(private apiService: ApiService) {}

  createStockTakeBatch() {
    return this.apiService.post<StockTakeBatch>(`/stock-take/create`, {});
  }

  addProductToStockTakeBatch(details:any){
    return this.apiService.post<any>(`/stock-take/add-product-to-batch`, details);
  }

  getProductsInBatch(batchNumber:number){
    return this.apiService.get<any>(`/stock-take/get-batch-products/${batchNumber}`);
  }

  adjustStock(details:any){
    return this.apiService.post<any>(`/stock-adjustment/adjust`, details)
  }
}

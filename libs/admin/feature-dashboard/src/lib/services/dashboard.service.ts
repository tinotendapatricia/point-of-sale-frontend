import { Injectable, inject } from '@angular/core';

import { ApiService } from '@pos-frontend/shared/data-access';

import {
  type LowStockProduct,
  type ProductSales,
  type RecentTransaction,
} from './dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly apiService = inject(ApiService);

  getLowSelling() {
    return this.apiService.get<ProductSales[]>(`/dashboard/low-selling`);
  }

  getTopSelling() {
    return this.apiService.get<ProductSales[]>(`/dashboard/top-selling`);
  }

  getRecentTransactions() {
    return this.apiService.get<RecentTransaction[]>(
      `/dashboard/recent-transactions`
    );
  }

  getLowStock() {
    return this.apiService.get<LowStockProduct[]>(`/dashboard/low-stock`);
  }
}

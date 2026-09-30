import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DashboardStore } from '../services/dashboard.store';

@Component({
  selector: 'pos-frontend-low-stock-products',
  templateUrl: './low-stock-products.component.html',
  styleUrl: './low-stock-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LowStockProductsComponent {
  private readonly dashboardStore = inject(DashboardStore);

  protected readonly lowStock = this.dashboardStore.lowStock;
  protected readonly loading = this.dashboardStore.lowStockLoading;

  constructor() {
    this.dashboardStore.getLowStock();
  }
}

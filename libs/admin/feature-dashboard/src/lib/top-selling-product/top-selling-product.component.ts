import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DashboardStore } from '../services/dashboard.store';

@Component({
  selector: 'pos-frontend-top-selling-product',
  templateUrl: './top-selling-product.component.html',
  styleUrl: './top-selling-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopSellingProductComponent {
  private readonly dashboardStore = inject(DashboardStore);

  protected readonly topSelling = this.dashboardStore.topSelling;
  protected readonly loading = this.dashboardStore.topSellingLoading;

  constructor() {
    this.dashboardStore.getTopSelling();
  }
}

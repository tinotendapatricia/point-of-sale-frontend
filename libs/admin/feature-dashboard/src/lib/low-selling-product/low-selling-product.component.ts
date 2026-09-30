import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DashboardStore } from '../services/dashboard.store';

@Component({
  selector: 'pos-frontend-low-selling-product',
  templateUrl: './low-selling-product.component.html',
  styleUrl: './low-selling-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LowSellingProductComponent {
  private readonly dashboardStore = inject(DashboardStore);

  protected readonly lowSelling = this.dashboardStore.lowSelling;
  protected readonly loading = this.dashboardStore.lowSellingLoading;

  constructor() {
    this.dashboardStore.getLowSelling();
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LowSellingProductComponent } from '../low-selling-product/low-selling-product.component';
import { RecentTransactionsComponent } from '../recent-transactions/recent-transactions.component';

@Component({
  selector: 'pos-frontend-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RecentTransactionsComponent, LowSellingProductComponent],
})
export class DashboardComponent {}

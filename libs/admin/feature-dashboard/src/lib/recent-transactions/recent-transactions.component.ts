import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { DashboardStore } from '../services/dashboard.store';

@Component({
  selector: 'pos-frontend-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrl: './recent-transactions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
})
export class RecentTransactionsComponent {
  private readonly dashboardStore = inject(DashboardStore);

  protected readonly recentTransactions = this.dashboardStore.recentTransactions;
  protected readonly loading = this.dashboardStore.recentTransactionsLoading;

  constructor() {
    this.dashboardStore.getRecentTransactions();
  }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-recent-transactions',
    templateUrl: './recent-transactions.component.html',
    styleUrls: ['./recent-transactions.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [AsyncPipe, CurrencyPipe]
})
export class RecentTransactionsComponent  implements OnInit {

sales$: Observable<any[]> | undefined;

constructor(public dashboardService: DashboardService) {}

ngOnInit(): void {
this.getRecentTransactions()
}

getRecentTransactions() {
  this.sales$ = this.dashboardService.getRecentTransactions();
}
}


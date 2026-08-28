import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RecentTransactionsComponent } from '../recent-transactions/recent-transactions.component';
import { LowSellingProductComponent } from '../low-selling-product/low-selling-product.component';

@Component({
    selector: 'pos-frontend-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RecentTransactionsComponent, LowSellingProductComponent]
})
export class DashboardComponent {}

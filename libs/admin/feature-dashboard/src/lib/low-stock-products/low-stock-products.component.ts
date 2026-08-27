import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';

@Component({
    selector: 'pos-frontend-low-stock-products',
    templateUrl: './low-stock-products.component.html',
    styleUrls: ['./low-stock-products.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LowStockProductsComponent implements OnInit {
  sales$: Observable<any[]> | undefined;

  constructor(public dashboardService: DashboardService) {}

  ngOnInit(): void {
  this.getLowStockProducts()
  }

 getLowStockProducts() {
    this.sales$ = this.dashboardService.getLowStock();
  }
}

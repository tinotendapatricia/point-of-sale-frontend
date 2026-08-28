import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';

@Component({
    selector: 'pos-frontend-top-selling-product',
    templateUrl: './top-selling-product.component.html',
    styleUrls: ['./top-selling-product.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager
})
export class TopSellingProductComponent implements OnInit  {

  sales$: Observable<any[]> | undefined;

  constructor(public dashboardService: DashboardService) {}

  ngOnInit(): void {
  this.getTopSellingProducts()
  }

 getTopSellingProducts() {
    this.sales$ = this.dashboardService.getTopSelling();
  }
}

import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductsFacade } from '@pos-frontend/products/data-access';
import { ReportsService } from '@pos-frontend/reports/data-access';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pos-frontend-sales-by-station',
    templateUrl: './sales-by-station.component.html',
    styleUrls: ['./sales-by-station.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager
})
export class SalesByStationComponent implements OnInit, OnDestroy {
  loading = false;
  sub1 = new Subscription();
  sub2 = new Subscription();

  constructor(
    private reportsService: ReportsService,
    public productsFacade: ProductsFacade
  ) {}
  ngOnInit(): void {
    this.productsFacade.getAllProducts();
  }



  getExcel(details:any) {
    this.sub2 = this.reportsService.getAllSalesForPeriodByProductExcel(details.fromDate,details.toDate, details.product).subscribe();
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}

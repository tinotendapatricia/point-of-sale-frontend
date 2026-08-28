import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { ProductsFacade } from '@pos-frontend/products/data-access';
import { ReportsService } from '@pos-frontend/reports/data-access';
import { Subscription } from 'rxjs';
import { ReportsFormComponent } from '../../../../../reports/ui/src/lib/reports-form/reports-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-sales-by-period-and-product',
    templateUrl: './sales-by-period-and-product.component.html',
    styleUrls: ['./sales-by-period-and-product.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReportsFormComponent, AsyncPipe]
})
export class SalesByPeriodAndProductComponent implements OnInit, OnDestroy {
  btnState = ClrLoadingState.DEFAULT;
  sub1 = new Subscription();
  sub2 = new Subscription();

  constructor(
    private reportsService: ReportsService,
    public productsFacade: ProductsFacade
  ) {}
  ngOnInit(): void {
    this.productsFacade.getAllProducts();
  }

  getPdf(details: any) {
    this.btnState = ClrLoadingState.LOADING;
    this.sub1 = this.reportsService
      .getAllSalesForPeriodByProductPDF(details.fromDate, details.toDate, details.product).subscribe();
  }

  getExcel(details:any) {
    this.sub2 = this.reportsService.getAllSalesForPeriodByProductExcel(details.fromDate,details.toDate, details.product).subscribe();
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}

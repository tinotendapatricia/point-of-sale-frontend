import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { PurchasesReportsService } from '@pos-frontend/reports/data-access';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pos-frontend-purchases-report-by-order-number',
  templateUrl: './purchases-report-by-order-number.component.html',
  styleUrls: ['./purchases-report-by-order-number.component.scss'],
})
export class PurchasesReportByOrderNumberComponent implements OnDestroy {

  btnState=ClrLoadingState.DEFAULT;
  sub1 = new Subscription();
  sub2 = new Subscription();

  constructor(private reportsService: PurchasesReportsService) {}
 

  getPdf(details:any) {
    this.btnState=ClrLoadingState.LOADING
    this.sub1 = this.reportsService.getPurchasesReportsByPurchaseOrder(details.orderNumber).subscribe({
      next:()=>{
        this.btnState = ClrLoadingState.SUCCESS
      },
      error:()=>{
        this.btnState = ClrLoadingState.ERROR
      }
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  }

  getExcel(details:any) {
    this.sub2 = this.reportsService.getPurchasesReportsByPurchaseOrderExcel(details.orderNumber).subscribe();
  }
}

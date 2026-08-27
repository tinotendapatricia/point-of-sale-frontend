import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { PurchasesReportsService } from '@pos-frontend/reports/data-access';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pos-frontend-purchases-report-grv-vs-purchases-summary',
    templateUrl: './purchases-report-grv-vs-purchases-summary.component.html',
    styleUrls: ['./purchases-report-grv-vs-purchases-summary.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PurchasesReportGrvVsPurchasesSummaryComponent implements OnDestroy {

  btnState=ClrLoadingState.DEFAULT;
  sub1 = new Subscription();
  sub2 = new Subscription();

  constructor(private reportsService: PurchasesReportsService) {}
 

  getPdf(details:any) {
    this.btnState=ClrLoadingState.LOADING
    this.sub1 = this.reportsService.purchasesVsGrvSummaryPDF(details.fromDate, details.toDate).subscribe({
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
    this.sub2 = this.reportsService.purchasesVsGrvSummaryExcel(details.fromDate, details.toDate).subscribe();
  }

}
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { PurchasesReportsService } from '@pos-frontend/reports/data-access';
import { Subscription } from 'rxjs';
import { ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
    selector: 'pos-frontend-purchases-report-grv-vs-purchases-summary',
    templateUrl: './purchases-report-grv-vs-purchases-summary.component.html',
    styleUrls: ['./purchases-report-grv-vs-purchases-summary.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReportsFormComponent]
})
export class PurchasesReportGrvVsPurchasesSummaryComponent implements OnDestroy {

  loading=false;
  sub1 = new Subscription();
  sub2 = new Subscription();

  constructor(private reportsService: PurchasesReportsService) {}
 

  getPdf(details:any) {
    this.loading=true
    this.sub1 = this.reportsService.purchasesVsGrvSummaryPDF(details.fromDate, details.toDate).subscribe({
      next:()=>{
        this.loading = false
      },
      error:()=>{
        this.loading = false
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
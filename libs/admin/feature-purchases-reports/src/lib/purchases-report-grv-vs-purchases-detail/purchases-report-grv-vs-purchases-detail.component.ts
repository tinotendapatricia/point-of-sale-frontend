import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { PurchasesReportsService } from '@pos-frontend/reports/data-access';
import { Subscription } from 'rxjs';
import { ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
    selector: 'pos-frontend-purchases-report-grv-vs-purchases-detail',
    templateUrl: './purchases-report-grv-vs-purchases-detail.component.html',
    styleUrls: ['./purchases-report-grv-vs-purchases-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReportsFormComponent]
})
export class PurchasesReportGrvVsPurchasesDetailComponent implements OnDestroy {

  loading=false;
  sub1 = new Subscription();
  sub2 = new Subscription();

  constructor(private reportsService: PurchasesReportsService) {}
 

  getPdf(details:any) {
    this.loading=true
    this.sub1 = this.reportsService.purchasesVsGrvDetailPDF(details.fromDate, details.toDate).subscribe({
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
    this.sub2 = this.reportsService.purchasesVsGrvDetailExcel(details.fromDate, details.toDate).subscribe();
  }
}

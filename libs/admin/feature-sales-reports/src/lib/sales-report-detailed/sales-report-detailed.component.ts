import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ReportsService } from '@pos-frontend/reports/data-access';
import { Subscription } from 'rxjs';
import { ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
    selector: 'pos-frontend-sales-report-detailed',
    templateUrl: './sales-report-detailed.component.html',
    styleUrls: ['./sales-report-detailed.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReportsFormComponent]
})
export class SalesReportDetailedComponent implements OnDestroy {


  loading=false;
  sub1 = new Subscription();
  sub2 = new Subscription();

  constructor(private reportsService: ReportsService) {}
 

  getPdf(details:any) {
    this.loading=true
    this.sub1 = this.reportsService.getAllSalesForPeriodPDFDetailed(details.fromDate,details.toDate).subscribe({
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
    this.sub2 = this.reportsService.getAllSalesForPeriodExcelDetailed(details.fromDate,details.toDate).subscribe();
  }
}

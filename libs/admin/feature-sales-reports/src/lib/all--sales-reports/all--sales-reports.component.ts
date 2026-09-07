import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ReportsService } from '@pos-frontend/reports/data-access';
import { Subscription } from 'rxjs';
import { ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
    selector: 'pos-frontend-all-sales-reports',
    templateUrl: './all--sales-reports.component.html',
    styleUrls: ['./all--sales-reports.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReportsFormComponent]
})
export class AllSalesReportsComponent implements OnDestroy {


  loading=false;
  sub1 = new Subscription();
  sub2 = new Subscription();

  constructor(private reportsService: ReportsService) {}
 

  getPdf(details:any) {
    this.loading=true
    this.sub1 = this.reportsService.getAllSalesForPeriodPDFSummary(details.fromDate,details.toDate).subscribe({
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
    this.sub2 = this.reportsService.getAllSalesForPeriodExcelSummary(details.fromDate,details.toDate).subscribe();
  }
}

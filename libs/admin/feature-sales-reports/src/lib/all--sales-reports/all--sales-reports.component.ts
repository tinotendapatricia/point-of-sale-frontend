import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { ReportsService } from '@pos-frontend/reports/data-access';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pos-frontend-all-sales-reports',
    templateUrl: './all--sales-reports.component.html',
    styleUrls: ['./all--sales-reports.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AllSalesReportsComponent implements OnDestroy {


  btnState=ClrLoadingState.DEFAULT;
  sub1 = new Subscription();
  sub2 = new Subscription();

  constructor(private reportsService: ReportsService) {}
 

  getPdf(details:any) {
    this.btnState=ClrLoadingState.LOADING
    this.sub1 = this.reportsService.getAllSalesForPeriodPDFSummary(details.fromDate,details.toDate).subscribe({
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
    this.sub2 = this.reportsService.getAllSalesForPeriodExcelSummary(details.fromDate,details.toDate).subscribe();
  }
}

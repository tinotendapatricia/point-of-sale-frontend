import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PurchasesReportsService } from '@pos-frontend/reports/data-access';
import { Subscription } from 'rxjs';
import { ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
    selector: 'pos-frontend-receiving-report-by-grv-number',
    templateUrl: './receiving-report-by-grv-number.component.html',
    styleUrls: ['./receiving-report-by-grv-number.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReportsFormComponent]
})
export class ReceivingReportByGrvNumberComponent implements OnDestroy {

  
  loading=false;
  sub1 = new Subscription();
  sub2 = new Subscription();

  constructor(private reportsService: PurchasesReportsService) {}
 

  getPdf(details:any) {
    this.loading=true
    this.sub1 = this.reportsService.grvByGrvNumber(details.grvNumber).subscribe({
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
    this.sub2 = this.reportsService.grvByGrvNumberExcel(details.grvNumber).subscribe();
  }
}

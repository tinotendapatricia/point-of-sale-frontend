import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { PurchasesReportsService } from '@pos-frontend/reports/data-access';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pos-frontend-receiving-report-by-grv-number',
    templateUrl: './receiving-report-by-grv-number.component.html',
    styleUrls: ['./receiving-report-by-grv-number.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ReceivingReportByGrvNumberComponent implements OnDestroy {

  
  btnState=ClrLoadingState.DEFAULT;
  sub1 = new Subscription();
  sub2 = new Subscription();

  constructor(private reportsService: PurchasesReportsService) {}
 

  getPdf(details:any) {
    this.btnState=ClrLoadingState.LOADING
    this.sub1 = this.reportsService.grvByGrvNumber(details.grvNumber).subscribe({
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
    this.sub2 = this.reportsService.grvByGrvNumberExcel(details.grvNumber).subscribe();
  }
}

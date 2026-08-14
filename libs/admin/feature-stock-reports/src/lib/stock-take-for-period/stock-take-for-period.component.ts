import { Component, OnDestroy } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { ReportsService } from '@pos-frontend/reports/data-access';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pos-frontend-stock-take-for-period',
  templateUrl: './stock-take-for-period.component.html',
  styleUrls: ['./stock-take-for-period.component.scss'],
})
export class StockTakeForPeriodComponent implements OnDestroy {


  btnState=ClrLoadingState.DEFAULT;
  sub1 = new Subscription();
  sub2 = new Subscription();

  constructor(private reportsService: ReportsService) {}
 

  getPdf(details:any) {
    this.btnState=ClrLoadingState.LOADING
    this.sub1 = this.reportsService.getCurrentStockListings().subscribe({
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
}
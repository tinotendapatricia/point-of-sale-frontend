import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { DebtorsFacade } from '@pos-frontend/debtors/data-access';
import { ReportsService } from '@pos-frontend/reports/data-access';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pos-frontend-top-selling-products-for-period',
  templateUrl: './top-selling-products-for-period.component.html',
  styleUrls: ['./top-selling-products-for-period.component.scss'],
})
export class TopSellingProductsForPeriodComponent implements OnInit, OnDestroy{

  
  btnState=ClrLoadingState.DEFAULT;
  sub1 = new Subscription();
  sub2 = new Subscription();

  constructor(private reportsService: ReportsService,
    public debtorsFacade:DebtorsFacade
    ) {}
  ngOnInit(): void {
    this.debtorsFacade.getAllDebtors()
  }
 

  getPdf(details:any) {
    this.btnState=ClrLoadingState.LOADING
    this.sub1 = this.reportsService.getTopSellingProduct(details.fromDate,details.toDate).subscribe({
      next:()=>{
        this.btnState = ClrLoadingState.SUCCESS
      },
      error:()=>{
        this.btnState = ClrLoadingState.ERROR
      }
    });
  }

  getExcel(details:any) {
    this.sub2 = this.reportsService.getAllSalesByDebtorExcel(details.fromDate,details.toDate, details.debtor).subscribe();
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  }
}

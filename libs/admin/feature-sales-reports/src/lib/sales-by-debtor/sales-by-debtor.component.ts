import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { DebtorsFacade } from '@pos-frontend/debtors/data-access';
import { ReportsService } from '@pos-frontend/reports/data-access';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pos-frontend-sales-by-debtor',
    templateUrl: './sales-by-debtor.component.html',
    styleUrls: ['./sales-by-debtor.component.scss'],
    standalone: false
})
export class SalesByDebtorComponent implements OnInit, OnDestroy{

  
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
    this.sub1 = this.reportsService.getAllSalesByDebtorPDF(details.fromDate,details.toDate, details.debtor).subscribe({
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

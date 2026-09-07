import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DebtorsFacade } from '@pos-frontend/debtors/data-access';
import { ReportsService } from '@pos-frontend/reports/data-access';
import { Subscription } from 'rxjs';
import { ReportsFormComponent } from '@pos-frontend/reports/ui';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-sales-by-debtor',
    templateUrl: './sales-by-debtor.component.html',
    styleUrls: ['./sales-by-debtor.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReportsFormComponent, AsyncPipe]
})
export class SalesByDebtorComponent implements OnInit, OnDestroy{

  
  loading=false;
  sub1 = new Subscription();
  sub2 = new Subscription();

  constructor(private reportsService: ReportsService,
    public debtorsFacade:DebtorsFacade
    ) {}
  ngOnInit(): void {
    this.debtorsFacade.getAllDebtors()
  }
 

  getPdf(details:any) {
    this.loading=true
    this.sub1 = this.reportsService.getAllSalesByDebtorPDF(details.fromDate,details.toDate, details.debtor).subscribe({
      next:()=>{
        this.loading = false
      },
      error:()=>{
        this.loading = false
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

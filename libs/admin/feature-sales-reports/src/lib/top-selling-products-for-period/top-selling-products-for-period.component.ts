import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DebtorsFacade } from '@pos-frontend/debtors/data-access';
import { ReportsService } from '@pos-frontend/reports/data-access';
import { Subscription } from 'rxjs';
import { ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
    selector: 'pos-frontend-top-selling-products-for-period',
    templateUrl: './top-selling-products-for-period.component.html',
    styleUrls: ['./top-selling-products-for-period.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReportsFormComponent]
})
export class TopSellingProductsForPeriodComponent implements OnInit, OnDestroy{

  
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
    this.sub1 = this.reportsService.getTopSellingProduct(details.fromDate,details.toDate).subscribe({
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

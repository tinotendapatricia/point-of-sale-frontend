import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { ConfigurationsService } from '@pos-frontend/configurations/data-access';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { DebtorsFacade } from '@pos-frontend/debtors/data-access';
import { ReportsService } from '@pos-frontend/reports/data-access';
import { Subscription } from 'rxjs';
import { CashupFormComponent } from '../../../../../reports/ui/src/lib/cashup-form/cashup-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-till-cashup-report',
    templateUrl: './till-cashup-report.component.html',
    styleUrls: ['./till-cashup-report.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CashupFormComponent, AsyncPipe]
})
export class TillCashupReportComponent implements OnInit, OnDestroy {
  btnState = ClrLoadingState.DEFAULT;
  sub1 = new Subscription();
  sub2 = new Subscription();
  tills:any[] = []


  constructor(
    private reportsService: ReportsService,
    public debtorsFacade: DebtorsFacade,
    public currenciesFacade: CurrenciesFacade,
    public configService:ConfigurationsService
  ) {}

  ngOnInit(): void {
    this.debtorsFacade.getAllDebtors();
    this.currenciesFacade.getAllCurrencies();
    this.configService.getPendingCashup().subscribe({
      next:(res)=>{
        this.tills = res
      }
    })
  }

  getPdf(details: any) {
    this.btnState = ClrLoadingState.LOADING;
    this.sub1 = this.reportsService
      .getCashup(
        details
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }


}

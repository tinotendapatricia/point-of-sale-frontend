import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { DebtorsFacade } from '@pos-frontend/debtors/data-access';
import { ReportsService } from '@pos-frontend/reports/data-access';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pos-frontend-generate-gp-report',
    templateUrl: './generate-gp-report.component.html',
    styleUrls: ['./generate-gp-report.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class GenerateGpReportComponent implements OnInit, OnDestroy {
  btnState = ClrLoadingState.DEFAULT;
  sub1 = new Subscription();
  sub2 = new Subscription();

  constructor(
    private reportsService: ReportsService,
    public debtorsFacade: DebtorsFacade
  ) {}

  ngOnInit(): void {
    this.debtorsFacade.getAllDebtors();
  }

  getPdf(details: any) {
    this.btnState = ClrLoadingState.LOADING;
    this.sub1 = this.reportsService.generateGPReport(details.fromDate, details.toDate, details.debtor).subscribe({
      next: () => {
        this.btnState = ClrLoadingState.SUCCESS;
      },
      error: () => {
        this.btnState = ClrLoadingState.ERROR;
      },
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}

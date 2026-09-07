import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DebtorsFacade } from '@pos-frontend/debtors/data-access';
import { ReportsService } from '@pos-frontend/reports/data-access';
import { Subscription } from 'rxjs';
import { ReportsFormComponent } from '@pos-frontend/reports/ui';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-generate-gp-report',
    templateUrl: './generate-gp-report.component.html',
    styleUrls: ['./generate-gp-report.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReportsFormComponent, AsyncPipe]
})
export class GenerateGpReportComponent implements OnInit, OnDestroy {
  loading = false;
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
    this.loading = true;
    this.sub1 = this.reportsService.generateGPReport(details.fromDate, details.toDate, details.debtor).subscribe({
      next: () => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}

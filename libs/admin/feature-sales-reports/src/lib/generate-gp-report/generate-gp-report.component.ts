import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DebtorStore } from '@pos-frontend/debtors/data-access';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
  selector: 'pos-frontend-generate-gp-report',
  templateUrl: './generate-gp-report.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, ReportsFormComponent],
})
export class GenerateGpReportComponent {
  private readonly reportStore = inject(ReportStore);
  private readonly debtorStore = inject(DebtorStore);

  protected readonly loading = this.reportStore.salesLoading;
  protected readonly debtors = this.debtorStore.debtors;

  constructor() {
    this.debtorStore.getAllDebtors();
  }

  protected getPdf({ fromDate, toDate, debtor }: ReportFormValue): void {
    this.reportStore.getGrossProfitReport({ fromDate, toDate, debtor });
  }
}

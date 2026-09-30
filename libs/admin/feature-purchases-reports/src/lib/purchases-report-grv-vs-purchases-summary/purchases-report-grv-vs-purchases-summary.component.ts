import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
  selector: 'pos-frontend-purchases-report-grv-vs-purchases-summary',
  templateUrl: './purchases-report-grv-vs-purchases-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, ReportsFormComponent],
})
export class PurchasesReportGrvVsPurchasesSummaryComponent {
  private readonly reportStore = inject(ReportStore);

  protected readonly loading = this.reportStore.purchasesLoading;

  protected getPdf({ fromDate, toDate }: ReportFormValue): void {
    this.reportStore.getPurchasesVsGrvSummaryPdf({ fromDate, toDate });
  }

  protected getExcel({ fromDate, toDate }: ReportFormValue): void {
    this.reportStore.getPurchasesVsGrvSummaryExcel({ fromDate, toDate });
  }
}

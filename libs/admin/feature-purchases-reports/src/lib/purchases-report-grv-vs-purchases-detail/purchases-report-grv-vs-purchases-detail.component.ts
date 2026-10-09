import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
  selector: 'pos-frontend-purchases-report-grv-vs-purchases-detail',
  templateUrl: './purchases-report-grv-vs-purchases-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReportsFormComponent],
})
export class PurchasesReportGrvVsPurchasesDetailComponent {
  private readonly reportStore = inject(ReportStore);

  protected readonly loading = this.reportStore.purchasesLoading;

  protected getPdf({ fromDate, toDate, download }: ReportFormValue): void {
    this.reportStore.getPurchasesVsGrvDetailPdf({ fromDate, toDate, download });
  }

  protected getExcel({ fromDate, toDate, download }: ReportFormValue): void {
    this.reportStore.getPurchasesVsGrvDetailExcel({ fromDate, toDate, download });
  }
}

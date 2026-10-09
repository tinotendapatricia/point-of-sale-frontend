import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
  selector: 'pos-frontend-sales-report-detailed',
  templateUrl: './sales-report-detailed.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReportsFormComponent],
})
export class SalesReportDetailedComponent {
  private readonly reportStore = inject(ReportStore);

  protected readonly loading = this.reportStore.salesLoading;

  protected getPdf({ fromDate, toDate, download }: ReportFormValue): void {
    this.reportStore.getSalesDetailedPdf({ fromDate, toDate, download });
  }

  protected getExcel({ fromDate, toDate, download }: ReportFormValue): void {
    this.reportStore.getSalesDetailedExcel({ fromDate, toDate, download });
  }
}

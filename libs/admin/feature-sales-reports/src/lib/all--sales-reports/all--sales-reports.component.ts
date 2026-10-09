import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
  selector: 'pos-frontend-all-sales-reports',
  templateUrl: './all--sales-reports.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReportsFormComponent],
})
export class AllSalesReportsComponent {
  private readonly reportStore = inject(ReportStore);

  protected readonly loading = this.reportStore.salesLoading;

  protected getPdf({ fromDate, toDate, download }: ReportFormValue): void {
    this.reportStore.getSalesSummaryPdf({ fromDate, toDate, download });
  }

  protected getExcel({ fromDate, toDate, download }: ReportFormValue): void {
    this.reportStore.getSalesSummaryExcel({ fromDate, toDate, download });
  }
}

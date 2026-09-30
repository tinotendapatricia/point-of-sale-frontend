import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
  selector: 'pos-frontend-all-sales-reports',
  templateUrl: './all--sales-reports.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, ReportsFormComponent],
})
export class AllSalesReportsComponent {
  private readonly reportStore = inject(ReportStore);

  protected readonly loading = this.reportStore.salesLoading;

  protected getPdf({ fromDate, toDate }: ReportFormValue): void {
    this.reportStore.getSalesSummaryPdf({ fromDate, toDate });
  }

  protected getExcel({ fromDate, toDate }: ReportFormValue): void {
    this.reportStore.getSalesSummaryExcel({ fromDate, toDate });
  }
}

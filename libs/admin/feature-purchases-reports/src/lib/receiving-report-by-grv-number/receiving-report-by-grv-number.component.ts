import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
  selector: 'pos-frontend-receiving-report-by-grv-number',
  templateUrl: './receiving-report-by-grv-number.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, ReportsFormComponent],
})
export class ReceivingReportByGrvNumberComponent {
  private readonly reportStore = inject(ReportStore);

  protected readonly loading = this.reportStore.purchasesLoading;

  protected getPdf({ grvNumber }: ReportFormValue): void {
    if (grvNumber !== null) {
      this.reportStore.getGrvPdf({ grvNumber });
    }
  }

  protected getExcel({ grvNumber }: ReportFormValue): void {
    if (grvNumber !== null) {
      this.reportStore.getGrvExcel({ grvNumber });
    }
  }
}

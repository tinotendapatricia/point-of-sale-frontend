import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
  selector: 'pos-frontend-print-batch',
  templateUrl: './print-batch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReportsFormComponent],
})
export class PrintBatchComponent {
  private readonly reportStore = inject(ReportStore);

  protected readonly loading = this.reportStore.stockLoading;

  protected getPdf({ batchNumber, download }: ReportFormValue): void {
    if (batchNumber !== null) {
      this.reportStore.getBatchReport({ batchNumber, download });
    }
  }
}

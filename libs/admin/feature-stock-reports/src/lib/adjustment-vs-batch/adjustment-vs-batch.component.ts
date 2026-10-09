import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
  selector: 'pos-frontend-adjustment-vs-batch',
  templateUrl: './adjustment-vs-batch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReportsFormComponent],
})
export class AdjustmentVsBatchComponent {
  private readonly reportStore = inject(ReportStore);

  protected readonly loading = this.reportStore.stockLoading;

  protected getPdf({ batchNumber, download }: ReportFormValue): void {
    if (batchNumber !== null) {
      this.reportStore.getAdjustmentVsBatchReport({ batch: batchNumber, download });
    }
  }
}

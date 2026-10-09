import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
  selector: 'pos-frontend-print-adjustment',
  templateUrl: './print-adjustment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReportsFormComponent],
})
export class PrintAdjustmentComponent {
  private readonly reportStore = inject(ReportStore);

  protected readonly loading = this.reportStore.stockLoading;

  protected getPdf({ adjustmentNumber, download }: ReportFormValue): void {
    if (adjustmentNumber !== null) {
      this.reportStore.getAdjustmentReport({ adjustmentNumber, download });
    }
  }
}

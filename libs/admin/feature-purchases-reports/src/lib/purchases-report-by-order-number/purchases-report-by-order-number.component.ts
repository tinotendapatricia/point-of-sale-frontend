import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
  selector: 'pos-frontend-purchases-report-by-order-number',
  templateUrl: './purchases-report-by-order-number.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, ReportsFormComponent],
})
export class PurchasesReportByOrderNumberComponent {
  private readonly reportStore = inject(ReportStore);

  protected readonly loading = this.reportStore.purchasesLoading;

  protected getPdf({ orderNumber }: ReportFormValue): void {
    if (orderNumber !== null) {
      this.reportStore.getPurchaseOrderPdf({ orderNumber });
    }
  }

  protected getExcel({ orderNumber }: ReportFormValue): void {
    if (orderNumber !== null) {
      this.reportStore.getPurchaseOrderExcel({ orderNumber });
    }
  }
}

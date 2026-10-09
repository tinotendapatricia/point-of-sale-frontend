import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
  selector: 'pos-frontend-purchases-report-by-order-number',
  templateUrl: './purchases-report-by-order-number.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReportsFormComponent],
})
export class PurchasesReportByOrderNumberComponent {
  private readonly reportStore = inject(ReportStore);

  protected readonly loading = this.reportStore.purchasesLoading;

  protected getPdf({ orderNumber, download }: ReportFormValue): void {
    if (orderNumber !== null) {
      this.reportStore.getPurchaseOrderPdf({ orderNumber, download });
    }
  }

  protected getExcel({ orderNumber, download }: ReportFormValue): void {
    if (orderNumber !== null) {
      this.reportStore.getPurchaseOrderExcel({ orderNumber, download });
    }
  }
}

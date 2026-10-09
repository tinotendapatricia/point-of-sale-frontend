import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DebtorStore } from '@pos-frontend/debtors/data-access';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
  selector: 'pos-frontend-sales-by-debtor',
  templateUrl: './sales-by-debtor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReportsFormComponent],
})
export class SalesByDebtorComponent {
  private readonly reportStore = inject(ReportStore);
  private readonly debtorStore = inject(DebtorStore);

  protected readonly loading = this.reportStore.salesLoading;
  protected readonly debtors = this.debtorStore.debtors;

  constructor() {
    this.debtorStore.getAllDebtors();
  }

  protected getPdf({ fromDate, toDate, debtor, download }: ReportFormValue): void {
    this.reportStore.getSalesByDebtorPdf({ fromDate, toDate, debtor, download });
  }

  protected getExcel({ fromDate, toDate, debtor, download }: ReportFormValue): void {
    this.reportStore.getSalesByDebtorExcel({ fromDate, toDate, debtor, download });
  }
}

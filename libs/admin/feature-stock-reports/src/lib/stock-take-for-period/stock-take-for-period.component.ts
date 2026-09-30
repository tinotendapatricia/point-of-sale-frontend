import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
  selector: 'pos-frontend-stock-take-for-period',
  templateUrl: './stock-take-for-period.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, ReportsFormComponent],
})
export class StockTakeForPeriodComponent {
  private readonly reportStore = inject(ReportStore);

  protected readonly loading = this.reportStore.stockLoading;

  protected getPdf({ fromDate, toDate }: ReportFormValue): void {
    this.reportStore.getStockTakesForPeriod({ fromDate, toDate });
  }
}

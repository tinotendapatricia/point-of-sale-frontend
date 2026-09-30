import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
  selector: 'pos-frontend-top-selling-products-for-period',
  templateUrl: './top-selling-products-for-period.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, ReportsFormComponent],
})
export class TopSellingProductsForPeriodComponent {
  private readonly reportStore = inject(ReportStore);

  protected readonly loading = this.reportStore.salesLoading;

  protected getPdf({ fromDate, toDate }: ReportFormValue): void {
    this.reportStore.getTopSellingProducts({ fromDate, toDate });
  }
}

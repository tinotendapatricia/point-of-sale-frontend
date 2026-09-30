import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
  selector: 'pos-frontend-current-stock-listing-report',
  templateUrl: './current-stock-listing-report.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, ReportsFormComponent],
})
export class CurrentStockListingReportComponent {
  private readonly reportStore = inject(ReportStore);

  protected readonly loading = this.reportStore.stockLoading;

  protected getPdf(): void {
    this.reportStore.getCurrentStockListing();
  }
}

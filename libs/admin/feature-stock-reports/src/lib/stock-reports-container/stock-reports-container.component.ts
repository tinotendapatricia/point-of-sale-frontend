import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { type ReportNavItem, ReportsLayoutComponent } from '@pos-frontend/shared/ui';
import { STOCK_REPORT_PAGES } from '../stock-report-pages';

@Component({
  selector: 'pos-frontend-stock-reports-container',
  templateUrl: './stock-reports-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ReportsLayoutComponent],
})
export class StockReportsContainerComponent {
  protected readonly reports: ReportNavItem[] = STOCK_REPORT_PAGES.map(({ path, label, description }) => ({
    path,
    label,
    description,
  }));
}

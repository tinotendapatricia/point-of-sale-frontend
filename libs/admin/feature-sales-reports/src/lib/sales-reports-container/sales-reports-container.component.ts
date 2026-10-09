import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { type ReportNavItem, ReportsLayoutComponent } from '@pos-frontend/shared/ui';
import { SALES_REPORT_PAGES } from '../sales-report-pages';

@Component({
  selector: 'pos-frontend-sales-reports-container',
  templateUrl: './sales-reports-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ReportsLayoutComponent],
})
export class SalesReportsContainerComponent {
  protected readonly reports: ReportNavItem[] = SALES_REPORT_PAGES.map(({ path, label, description }) => ({
    path,
    label,
    description,
  }));
}

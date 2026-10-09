import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { type ReportNavItem, ReportsLayoutComponent } from '@pos-frontend/shared/ui';
import { PURCHASES_REPORT_PAGES } from '../purchases-report-pages';

@Component({
  selector: 'pos-frontend-purchases-reports-container',
  templateUrl: './purchases-reports-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ReportsLayoutComponent],
})
export class PurchasesReportsContainerComponent {
  protected readonly reports: ReportNavItem[] = PURCHASES_REPORT_PAGES.map(({ path, label, description }) => ({
    path,
    label,
    description,
  }));
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { type ReportNavItem, ReportsLayoutComponent } from '@pos-frontend/shared/ui';

import { STOCK_TAKE_PAGES } from '../stock-take-pages';

@Component({
  selector: 'pos-frontend-stock-take-container',
  templateUrl: './stock-take-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ReportsLayoutComponent],
})
export class StockTakeContainerComponent {
  protected readonly steps: ReportNavItem[] = STOCK_TAKE_PAGES.map(({ path, label, description }) => ({
    path,
    label,
    description,
  }));
}

import { type Routes } from '@angular/router';
import { StockReportsContainerComponent } from './stock-reports-container/stock-reports-container.component';
import { STOCK_REPORT_PAGES } from './stock-report-pages';

// Each report is a child route, so the selected report survives a reload.
export const ADMIN_FEATURE_STOCK_REPORTS_ROUTES: Routes = [
  {
    path: '',
    component: StockReportsContainerComponent,
    children: [
      { path: '', redirectTo: 'current-stock', pathMatch: 'full' },
      ...STOCK_REPORT_PAGES.map(({ path, component }) => ({ path, component })),
    ],
  },
];

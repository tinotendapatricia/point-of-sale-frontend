import { type Routes } from '@angular/router';
import { SalesReportsContainerComponent } from './sales-reports-container/sales-reports-container.component';
import { SALES_REPORT_PAGES } from './sales-report-pages';

// Each report is a child route, so the selected report survives a reload.
export const ADMIN_FEATURE_SALES_REPORTS_ROUTES: Routes = [
  {
    path: '',
    component: SalesReportsContainerComponent,
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      ...SALES_REPORT_PAGES.map(({ path, component }) => ({ path, component })),
    ],
  },
];

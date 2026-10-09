import { type Routes } from '@angular/router';
import { PurchasesReportsContainerComponent } from './purchases-reports-container/purchases-reports-container.component';
import { PURCHASES_REPORT_PAGES } from './purchases-report-pages';

// Each report is a child route, so the selected report survives a reload.
export const ADMIN_FEATURE_PURCHASES_REPORTS_ROUTES: Routes = [
  {
    path: '',
    component: PurchasesReportsContainerComponent,
    children: [
      { path: '', redirectTo: 'grv-summary', pathMatch: 'full' },
      ...PURCHASES_REPORT_PAGES.map(({ path, component }) => ({ path, component })),
    ],
  },
];

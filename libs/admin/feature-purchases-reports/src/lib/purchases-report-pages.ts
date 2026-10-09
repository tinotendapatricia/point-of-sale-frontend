import { type Type } from '@angular/core';
import { type ReportNavItem } from '@pos-frontend/shared/ui';
import { PurchasesReportGrvVsPurchasesSummaryComponent } from './purchases-report-grv-vs-purchases-summary/purchases-report-grv-vs-purchases-summary.component';
import { PurchasesReportGrvVsPurchasesDetailComponent } from './purchases-report-grv-vs-purchases-detail/purchases-report-grv-vs-purchases-detail.component';
import { PurchasesReportByOrderNumberComponent } from './purchases-report-by-order-number/purchases-report-by-order-number.component';
import { ReceivingReportByGrvNumberComponent } from './receiving-report-by-grv-number/receiving-report-by-grv-number.component';

/** Every report in this section: its child route, nav label, summary and component. */
export const PURCHASES_REPORT_PAGES: (ReportNavItem & { component: Type<unknown> })[] = [
  {
    path: 'grv-summary',
    label: 'Purchases vs GRV Summary For Period',
    description: 'Totals ordered vs received across a date range',
    component: PurchasesReportGrvVsPurchasesSummaryComponent,
  },
  {
    path: 'grv-detailed',
    label: 'Purchases Vs GRV Detailed',
    description: 'Line-by-line comparison for a period',
    component: PurchasesReportGrvVsPurchasesDetailComponent,
  },
  {
    path: 'by-order-number',
    label: 'Purchase Report By Order Number',
    description: 'Everything on one purchase order',
    component: PurchasesReportByOrderNumberComponent,
  },
  {
    path: 'receiving-by-grv',
    label: 'Receiving By GRV Number',
    description: 'What was received on one goods received voucher',
    component: ReceivingReportByGrvNumberComponent,
  },
];

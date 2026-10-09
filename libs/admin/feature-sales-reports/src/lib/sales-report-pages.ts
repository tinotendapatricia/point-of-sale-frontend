import { type Type } from '@angular/core';
import { type ReportNavItem } from '@pos-frontend/shared/ui';
import { AllSalesReportsComponent } from './all--sales-reports/all--sales-reports.component';
import { SalesReportDetailedComponent } from './sales-report-detailed/sales-report-detailed.component';
import { SalesByPeriodAndProductComponent } from './sales-by-period-and-product/sales-by-period-and-product.component';
import { SalesByDebtorComponent } from './sales-by-debtor/sales-by-debtor.component';
import { TopSellingProductsForPeriodComponent } from './top-selling-products-for-period/top-selling-products-for-period.component';
import { TillCashupReportComponent } from './till-cashup-report/till-cashup-report.component';
import { GenerateGpReportComponent } from './generate-gp-report/generate-gp-report.component';

/** Every report in this section: its child route, nav label, summary and component. */
export const SALES_REPORT_PAGES: (ReportNavItem & { component: Type<unknown> })[] = [
  {
    path: 'summary',
    label: 'All Sales Summary Listing For Period',
    description: 'Sales totals across a date range',
    component: AllSalesReportsComponent,
  },
  {
    path: 'detailed',
    label: 'All Sales Detailed Listing For Period',
    description: 'Every sale line for a period',
    component: SalesReportDetailedComponent,
  },
  {
    path: 'by-product',
    label: 'All Sales by Product and Day',
    description: 'Daily sales for one or all products',
    component: SalesByPeriodAndProductComponent,
  },
  {
    path: 'by-debtor',
    label: 'Sales by Debtor and Period',
    description: 'Account sales for one or all debtors',
    component: SalesByDebtorComponent,
  },
  {
    path: 'top-selling',
    label: 'Top Selling Product',
    description: 'Best-selling products for a period',
    component: TopSellingProductsForPeriodComponent,
  },
  {
    path: 'till-cashup',
    label: 'Till Cashup',
    description: 'Count a till and print its cash-up',
    component: TillCashupReportComponent,
  },
  {
    path: 'gross-profit',
    label: 'Gross Profit Report',
    description: 'Margin on sales for a period',
    component: GenerateGpReportComponent,
  },
];

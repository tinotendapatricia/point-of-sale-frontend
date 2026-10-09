import { type Type } from '@angular/core';
import { type ReportNavItem } from '@pos-frontend/shared/ui';
import { CurrentStockListingReportComponent } from './current-stock-listing-report/current-stock-listing-report.component';
import { PrintBatchComponent } from './print-batch/print-batch.component';
import { PrintAdjustmentComponent } from './print-adjustment/print-adjustment.component';
import { AdjustmentVsBatchComponent } from './adjustment-vs-batch/adjustment-vs-batch.component';
import { StockTakeForPeriodComponent } from './stock-take-for-period/stock-take-for-period.component';

/** Every report in this section: its child route, nav label, summary and component. */
export const STOCK_REPORT_PAGES: (ReportNavItem & { component: Type<unknown> })[] = [
  {
    path: 'current-stock',
    label: 'Current Stock Listing Reports',
    description: 'Quantities on hand right now',
    component: CurrentStockListingReportComponent,
  },
  {
    path: 'print-batch',
    label: 'Print Batch',
    description: 'Every product counted in one stock-take batch',
    component: PrintBatchComponent,
  },
  {
    path: 'print-adjustment',
    label: 'Print Stock Adjustment',
    description: 'The changes made by one stock adjustment',
    component: PrintAdjustmentComponent,
  },
  {
    path: 'batch-vs-adjustment',
    label: 'Batch vs Adjustment',
    description: 'Counted quantities against what was adjusted',
    component: AdjustmentVsBatchComponent,
  },
  {
    path: 'stock-takes',
    label: 'Stock Takes for Period',
    description: 'Stock takes completed in a period',
    component: StockTakeForPeriodComponent,
  },
];

import { type Type } from '@angular/core';
import { type ReportNavItem } from '@pos-frontend/shared/ui';
import { CreateStockBatchComponent } from './create-stock-batch/create-stock-batch.component';
import { StockTakeComponent } from './stock-take/stock-take.component';

/** The stock take steps: child route, nav label, summary and component. */
export const STOCK_TAKE_PAGES: (ReportNavItem & { component: Type<unknown> })[] = [
  {
    path: 'batch',
    label: 'Create Stock Batch',
    description: 'Open a batch and count products into it',
    component: CreateStockBatchComponent,
  },
  {
    path: 'compare',
    label: 'Stock Take',
    description: 'Compare a batch with system stock and adjust',
    component: StockTakeComponent,
  },
];

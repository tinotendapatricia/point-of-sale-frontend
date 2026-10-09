import { type Routes } from '@angular/router';

import { StockTakeContainerComponent } from './stock-take-container/stock-take-container.component';
import { STOCK_TAKE_PAGES } from './stock-take-pages';

// Each step is a child route, so the open step survives a reload.
export const ADMIN_FEATURE_STOCK_TAKE_ROUTES: Routes = [
  {
    path: '',
    component: StockTakeContainerComponent,
    children: [
      { path: '', redirectTo: 'batch', pathMatch: 'full' },
      ...STOCK_TAKE_PAGES.map(({ path, component }) => ({ path, component })),
    ],
  },
];

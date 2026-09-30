import { type Routes } from '@angular/router';

import { StockTakeContainerComponent } from './stock-take-container/stock-take-container.component';

export const ADMIN_FEATURE_STOCK_TAKE_ROUTES: Routes = [
  { path: '', component: StockTakeContainerComponent },
];

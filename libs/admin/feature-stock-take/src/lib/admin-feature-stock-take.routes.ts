import { Routes } from '@angular/router';
import { StockTakeContainerComponent } from './stock-take-container/stock-take-container.component';
import { provideProductsDataAccess } from '@pos-frontend/products/data-access';

export const ADMIN_FEATURE_STOCK_TAKE_ROUTES: Routes = [
  {
    path: '',
    component: StockTakeContainerComponent,
    providers: [provideProductsDataAccess()],
  },
];

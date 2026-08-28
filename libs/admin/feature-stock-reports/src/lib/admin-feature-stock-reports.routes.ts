import { Routes } from '@angular/router';
import { StockReportsContainerComponent } from './stock-reports-container/stock-reports-container.component';
import { provideProductsDataAccess } from '@pos-frontend/products/data-access';

export const ADMIN_FEATURE_STOCK_REPORTS_ROUTES: Routes = [
  {
    path: '',
    component: StockReportsContainerComponent,
    providers: [provideProductsDataAccess()],
  },
];

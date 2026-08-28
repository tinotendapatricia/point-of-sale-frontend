import { Routes } from '@angular/router';
import { SalesReportsContainerComponent } from './sales-reports-container/sales-reports-container.component';
import { provideDebtorsDataAccess } from '@pos-frontend/debtors/data-access';
import { provideCurrenciesDataAccess } from '@pos-frontend/currencies/data-access';
import { provideProductsDataAccess } from '@pos-frontend/products/data-access';

export const ADMIN_FEATURE_SALES_REPORTS_ROUTES: Routes = [
  {
    path: '',
    component: SalesReportsContainerComponent,
    providers: [
      provideDebtorsDataAccess(),
      provideCurrenciesDataAccess(),
      provideProductsDataAccess(),
    ],
  },
];

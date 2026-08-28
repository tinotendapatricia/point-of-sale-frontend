import { Routes } from '@angular/router';
import { RefundHomeComponent } from './refund-home/refund-home.component';
import { provideCurrenciesDataAccess } from '@pos-frontend/currencies/data-access';
import { provideDebtorsDataAccess } from '@pos-frontend/debtors/data-access';
import { providePosDataAccess } from '@pos-frontend/pos/data-access';
import { provideProductsDataAccess } from '@pos-frontend/products/data-access';
import { provideVatDataAccess } from '@pos-frontend/vat/data-access';

export const CLIENT_FEATURE_REFUND_ROUTES: Routes = [
  {
    path: '',
    component: RefundHomeComponent,
    providers: [
      provideProductsDataAccess(),
      provideDebtorsDataAccess(),
      provideVatDataAccess(),
      provideCurrenciesDataAccess(),
      providePosDataAccess(),
    ],
  },
];

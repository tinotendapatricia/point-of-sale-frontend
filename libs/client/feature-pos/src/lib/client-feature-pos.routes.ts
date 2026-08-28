import { Routes } from '@angular/router';
import { PosHomeComponent } from './pos-home/pos-home.component';
import { provideProductsDataAccess } from '@pos-frontend/products/data-access';
import { provideDebtorsDataAccess } from '@pos-frontend/debtors/data-access';
import { provideVatDataAccess } from '@pos-frontend/vat/data-access';
import { provideCurrenciesDataAccess } from '@pos-frontend/currencies/data-access';
import { providePosDataAccess } from '@pos-frontend/pos/data-access';

export const CLIENT_FEATURE_POS_ROUTES: Routes = [
  {
    path: '',
    component: PosHomeComponent,
    providers: [
      provideProductsDataAccess(),
      provideDebtorsDataAccess(),
      provideVatDataAccess(),
      provideCurrenciesDataAccess(),
      providePosDataAccess(),
    ],
  },
];

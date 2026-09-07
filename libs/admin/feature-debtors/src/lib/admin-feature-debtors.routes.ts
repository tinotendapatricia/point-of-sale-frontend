import { Routes } from '@angular/router';
import { ListDebtorsComponent } from './list-debtors/list-debtors.component';
import { provideDebtorsDataAccess } from '@pos-frontend/debtors/data-access';
import { provideCurrenciesDataAccess } from '@pos-frontend/currencies/data-access';

export const ADMIN_FEATURE_DEBTORS_ROUTES: Routes = [
  {
    path: '',
    component: ListDebtorsComponent,
    providers: [provideDebtorsDataAccess(), provideCurrenciesDataAccess()],
  },
];

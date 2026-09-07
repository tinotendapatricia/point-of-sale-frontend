import { Routes } from '@angular/router';
import { CurrenciesListComponent } from './currencies-list/currencies-list.component';
import { provideCurrenciesDataAccess } from '@pos-frontend/currencies/data-access';

export const ADMIN_FEATURE_CURRENCIES_ROUTES: Routes = [
  {
    path: '',
    component: CurrenciesListComponent,
    providers: [provideCurrenciesDataAccess()],
  },
];

import { type Routes } from '@angular/router';
import { CurrenciesListComponent } from './currencies-list/currencies-list.component';

export const ADMIN_FEATURE_CURRENCIES_ROUTES: Routes = [
  { path: '', component: CurrenciesListComponent },
];

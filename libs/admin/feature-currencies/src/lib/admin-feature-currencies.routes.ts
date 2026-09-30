import { type Routes } from '@angular/router';
import { CurrenciesListComponent } from './currencies-list/currencies-list.component';
import { CreateCurrencyComponent } from './create-currency/create-currency.component';
import { UpdateCurrencyComponent } from './update-currency/update-currency.component';

// CurrencyStore is a root-provided signal store (see currency.store.ts) — no
// route-level provider needed, unlike the legacy CurrenciesFacade.
export const ADMIN_FEATURE_CURRENCIES_ROUTES: Routes = [
  { path: '', component: CurrenciesListComponent },
  { path: 'new', component: CreateCurrencyComponent },
  { path: 'update/:currencyId', component: UpdateCurrencyComponent },
];

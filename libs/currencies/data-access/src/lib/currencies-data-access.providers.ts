import { EnvironmentProviders, Provider } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromCurrencies from './+state/currencies.reducer';
import { CurrenciesEffects } from './+state/currencies.effects';
import { CurrenciesFacade } from './+state/currencies.facade';

export function provideCurrenciesDataAccess(): (Provider | EnvironmentProviders)[] {
  return [
    provideState(fromCurrencies.CURRENCIES_FEATURE_KEY, fromCurrencies.currenciesReducer),
    provideEffects(CurrenciesEffects),
    CurrenciesFacade,
  ];
}

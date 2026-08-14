import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCurrencies from './+state/currencies.reducer';
import { CurrenciesEffects } from './+state/currencies.effects';
import { CurrenciesFacade } from './+state/currencies.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCurrencies.CURRENCIES_FEATURE_KEY,
      fromCurrencies.currenciesReducer
    ),
    EffectsModule.forFeature([CurrenciesEffects]),
  ],
  providers: [CurrenciesFacade],
})
export class CurrenciesDataAccessModule {}

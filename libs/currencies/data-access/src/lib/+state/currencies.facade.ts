import { Injectable, inject } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { select, Store, Action } from '@ngrx/store';

import * as CurrenciesActions from './currencies.actions';
import { CurrenciesEntity } from './currencies.models';
import * as CurrenciesFeature from './currencies.reducer';
import * as CurrenciesSelectors from './currencies.selectors';

@Injectable()
export class CurrenciesFacade {
  loaded$ = this.store.pipe(select(CurrenciesSelectors.selectCurrenciesLoaded));
  allCurrencies$ = this.store.pipe(
    select(CurrenciesSelectors.selectAllCurrencies)
  );
  selectedCurrency$ = this.store.pipe(
    select(CurrenciesSelectors.getSelectedCurrency)
  );
  loading$ = this.store.pipe(
    select(CurrenciesSelectors.getCurrenciesLoadingState)
  );
  totalCurrencies$ = this.store.pipe(
    select(CurrenciesSelectors.getTotalCurrencies)
  );
  btnState$ = this.store.pipe(select(CurrenciesSelectors.getBtnState));

  defaultCurrency$ = this.store.pipe(
    select(CurrenciesSelectors.getSelectedDefault)
  );

  constructor(private store: Store<CurrenciesFeature.CurrenciesPartialState>) {}

  getPaginatedCurrencies(state: ClrDatagridStateInterface) {
    this.store.dispatch(CurrenciesActions.getPaginatedCurrencies({ state }));
  }

  getAllCurrencies() {
    this.store.dispatch(CurrenciesActions.getAllCurrencies());
  }

  getCurrency(currencyId: string | number) {
    this.store.dispatch(CurrenciesActions.getCurrencyById({ currencyId }));
  }

  createNewCurrency(currency: CurrenciesEntity) {
    this.store.dispatch(CurrenciesActions.createCurrency(currency));
  }

  updateCurrency(currency: CurrenciesEntity) {
    this.store.dispatch(CurrenciesActions.updateCurrency(currency));
  }

  updateRate(rateDetails:any) {
    this.store.dispatch(CurrenciesActions.updateRate(rateDetails));
  }

  makeDefault(currency: any) {
    this.store.dispatch(CurrenciesActions.makeDefault(currency));
  }

  getDefaultCurrency() {
    this.store.dispatch(CurrenciesActions.getDefaultCurrency());
  }
}

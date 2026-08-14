import { ClrLoadingState } from '@clr/angular';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CurrenciesActions from './currencies.actions';
import { CurrenciesEntity } from './currencies.models';

export const CURRENCIES_FEATURE_KEY = 'currencies';

export interface CurrenciesState extends EntityState<CurrenciesEntity> {
  selectedId?: string | number;
  loaded?: boolean;
  loading: boolean;
  error?: Error;
  selectedCurrency: CurrenciesEntity | undefined;
  total: number;
  btnState: ClrLoadingState;
  currentPage: number;
  selectedDefault: CurrenciesEntity | undefined;
}

export interface CurrenciesPartialState {
  readonly [CURRENCIES_FEATURE_KEY]: CurrenciesState;
}

export const currenciesAdapter: EntityAdapter<CurrenciesEntity> =
  createEntityAdapter<CurrenciesEntity>();

export const initialCurrenciesState: CurrenciesState =
  currenciesAdapter.getInitialState({
    loaded: false,
    loading: false,
    error: undefined,
    selectedCurrency: undefined,
    total: 0,
    btnState: ClrLoadingState.DEFAULT,
    currentPage: 0,
    selectedDefault: undefined,
  });

const reducer = createReducer(
  initialCurrenciesState,
  on(
    CurrenciesActions.getCurrencyById,
    CurrenciesActions.getPaginatedCurrencies,
    CurrenciesActions.getAllCurrencies,
    CurrenciesActions.getDefaultCurrency,
    (state) => ({
      ...state,
      loading: true,
    })
  ),

  on(CurrenciesActions.getCurrencyByIdSuccess, (state, { currency }) => ({
    ...state,
    loading: false,
    loaded: true,
    selectedCurrency: currency,
  })),

  on(CurrenciesActions.getDefaultCurrencySuccess, (state, { currency }) => ({
    ...state,
    loading: false,
    loaded: true,
    selectedDefault: currency,
  })),

  on(CurrenciesActions.getAllCurrenciesSuccess, (state, { currencies }) =>
    currenciesAdapter.setAll(currencies, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),

  on(
    CurrenciesActions.getPaginatedCurrenciesSuccess,
    (state, { currencies, total, page }) =>
      currenciesAdapter.setAll(currencies, {
        ...state,
        loading: false,
        loaded: true,
        total: total,
        currentPage: page,
      })
  ),

  on(
    CurrenciesActions.getAllCurrenciesFailure,
    CurrenciesActions.getCurrencyByIdFailure,
    CurrenciesActions.getPaginatedCurrenciesFailure,
    CurrenciesActions.getDefaultCurrencyFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error,
    })
  ),

  on(
    CurrenciesActions.createCurrency,
    CurrenciesActions.updateCurrency,
    CurrenciesActions.deleteCurrency,
    CurrenciesActions.makeDefault,
    CurrenciesActions.updateRate,
    (state) => ({
      ...state,
      btnState: ClrLoadingState.LOADING,
      loaded: false,
      error: undefined,
    })
  ),

  on(
    CurrenciesActions.createCurrenciesuccess,
    CurrenciesActions.updateCurrenciesuccess,
    CurrenciesActions.deleteCurrenciesuccess,
    CurrenciesActions.makeDefaultSuccess,
    CurrenciesActions.updateRateSuccess,
    (state) => ({
      ...state,
      loaded: true,
      btnState: ClrLoadingState.SUCCESS,
    })
  ),

  on(
    CurrenciesActions.createCurrencyFailure,
    CurrenciesActions.updateCurrencyFailure,
    CurrenciesActions.deleteCurrencyFailure,
    CurrenciesActions.makeDefaultFailure,
    CurrenciesActions.updateRateFailure,
    (state, { error }) => ({
      ...state,
      error: error,
      btnState: ClrLoadingState.ERROR,
    })
  )
);

export function currenciesReducer(
  state: CurrenciesState | undefined,
  action: Action
) {
  return reducer(state, action);
}

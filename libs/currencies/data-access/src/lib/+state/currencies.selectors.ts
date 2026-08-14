import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CURRENCIES_FEATURE_KEY,
  CurrenciesState,
  currenciesAdapter,
} from './currencies.reducer';

// Lookup the 'Currencies' feature state managed by NgRx
export const selectCurrenciesState = createFeatureSelector<CurrenciesState>(
  CURRENCIES_FEATURE_KEY
);

const { selectAll, selectEntities } = currenciesAdapter.getSelectors();

export const selectCurrenciesLoaded = createSelector(
  selectCurrenciesState,
  (state: CurrenciesState) => state.loaded
);

export const selectCurrenciesError = createSelector(
  selectCurrenciesState,
  (state: CurrenciesState) => state.error
);

export const selectAllCurrencies = createSelector(
  selectCurrenciesState,
  (state: CurrenciesState) => selectAll(state)
);

export const selectCurrenciesEntities = createSelector(
  selectCurrenciesState,
  (state: CurrenciesState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectCurrenciesState,
  (state: CurrenciesState) => state.selectedId
);

export const selectEntity = createSelector(
  selectCurrenciesEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const getSelectedId = createSelector(
  selectCurrenciesState,
  (state: CurrenciesState) => state.selectedId
);

export const getSelected = (currencyId: string | number) =>
  createSelector(selectCurrenciesEntities, (entities) => entities[currencyId]);

export const getSelectedCurrency = createSelector(
  selectCurrenciesState,
  (state: CurrenciesState) => state.selectedCurrency
);

export const getTotalCurrencies = createSelector(
  selectCurrenciesState,
  (state: CurrenciesState) => state.total
);

export const getCurrentPageState = createSelector(
  selectCurrenciesState,
  (state: CurrenciesState) => state.currentPage
);

export const getCurrenciesLoadingState = createSelector(
  selectCurrenciesState,
  (state: CurrenciesState) => state.loading
);

export const getBtnState = createSelector(
  selectCurrenciesState,
  (state: CurrenciesState) => state.btnState
);

export const getSelectedDefault = createSelector(
  selectCurrenciesState,
  (state: CurrenciesState) => state.selectedDefault
);

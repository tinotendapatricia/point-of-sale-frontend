import { createAction, props } from '@ngrx/store';
import { CurrenciesEntity } from './currencies.models';

import { DatagridState } from '@pos-frontend/shared/utils';

export const getPaginatedCurrencies = createAction(
  '[Currencies] Get Paginated Currencies',
  props<{ state: DatagridState }>()
);

export const getPaginatedCurrenciesSuccess = createAction(
  '[Currencies] Get Paginated Currencies Success',
  props<{ currencies: CurrenciesEntity[]; total: number; page: number }>()
);

export const getPaginatedCurrenciesFailure = createAction(
  '[Currencies] Get Paginated Currencies Failure',
  props<{ error: Error }>()
);

export const getAllCurrencies = createAction('[Currencies] Get All Currencies');

export const getAllCurrenciesSuccess = createAction(
  '[Currencies] Get All Currencies Success',
  props<{ currencies: CurrenciesEntity[] }>()
);

export const getAllCurrenciesFailure = createAction(
  '[Currencies] Get All Currencies Failure',
  props<{ error: Error }>()
);

export const getCurrencyById = createAction(
  '[Currencies] Get Currency',
  props<{ currencyId: string | number }>()
);

export const getCurrencyByIdSuccess = createAction(
  '[Currencies] Get Currency Success',
  props<{ currency: CurrenciesEntity }>()
);

export const getCurrencyByIdFailure = createAction(
  '[Currencies] Get Currency Failure',
  props<{ error: any }>()
);

export const getDefaultCurrency = createAction(
  '[Currencies] Get Defaulty Currency'
);

export const getDefaultCurrencySuccess = createAction(
  '[Currencies] Get Defaulty Currency Success',
  props<{ currency: CurrenciesEntity }>()
);

export const getDefaultCurrencyFailure = createAction(
  '[Currencies] Get Defaulty Currency Failure',
  props<{ error: any }>()
);

export const createCurrency = createAction(
  '[Currencies] Create Currency',
  (currencyDetails: CurrenciesEntity) => ({ currencyDetails })
);

export const createCurrenciesuccess = createAction(
  '[Currencies] Create Currency Success',
  (currencyDetails: CurrenciesEntity) => ({ currencyDetails })
);

export const createCurrencyFailure = createAction(
  '[Currencies] Create Currency Failure',
  props<{ error: Error }>()
);

export const makeDefault = createAction(
  '[Currencies] Make Defaulty Currency',
  (currencyDetails: CurrenciesEntity) => ({ currencyDetails })
);

export const makeDefaultSuccess = createAction(
  '[Currencies] Make Defaulty Currency Success',
  (currencyDetails: CurrenciesEntity) => ({ currencyDetails })
);

export const makeDefaultFailure = createAction(
  '[Currencies] Make Defaulty CurrencyFailure',
  props<{ error: Error }>()
);

export const deleteCurrency = createAction(
  '[Currencies] Delete Currency',
  props<{ currencyId: string | number }>()
);

export const deleteCurrenciesuccess = createAction(
  '[Currencies] Delete Currency Success'
);

export const deleteCurrencyFailure = createAction(
  '[Currencies] Delete Currency Failure',
  props<{ error: Error }>()
);

export const updateCurrency = createAction(
  '[Currencies] Update Currency',
  (currencyDetails: CurrenciesEntity) => ({ currencyDetails })
);

export const updateCurrenciesuccess = createAction(
  '[Currencies] Update Currency Success',
  (currencyDetails: CurrenciesEntity) => ({ currencyDetails })
);

export const updateCurrencyFailure = createAction(
  '[Currencies] Update Currency Failure',
  props<{ error: Error }>()
);

export const updateRate = createAction(
  '[Currencies] Update Rate',
  (currencyDetails: CurrenciesEntity) => ({ currencyDetails })
);

export const updateRateSuccess = createAction(
  '[Currencies] Update Rate Success',
  (currencyDetails: CurrenciesEntity) => ({ currencyDetails })
);

export const updateRateFailure = createAction(
  '[Currencies] Update Rate Failure',
  props<{ error: Error }>()
);

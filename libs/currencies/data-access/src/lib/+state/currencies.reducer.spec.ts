import { Action } from '@ngrx/store';

import * as CurrenciesActions from './currencies.actions';
import { CurrenciesEntity } from './currencies.models';
import {
  CurrenciesState,
  initialCurrenciesState,
  currenciesReducer,
} from './currencies.reducer';

describe('Currencies Reducer', () => {
  const createCurrenciesEntity = (id: string, name = ''): CurrenciesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Currencies actions', () => {
    it('loadCurrenciesSuccess should return the list of known Currencies', () => {
      const currencies = [
        createCurrenciesEntity('PRODUCT-AAA'),
        createCurrenciesEntity('PRODUCT-zzz'),
      ];
      const action = CurrenciesActions.loadCurrenciesSuccess({ currencies });

      const result: CurrenciesState = currenciesReducer(
        initialCurrenciesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = currenciesReducer(initialCurrenciesState, action);

      expect(result).toBe(initialCurrenciesState);
    });
  });
});

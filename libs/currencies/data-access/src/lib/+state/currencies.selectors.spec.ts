import { CurrenciesEntity } from './currencies.models';
import {
  currenciesAdapter,
  CurrenciesPartialState,
  initialCurrenciesState,
} from './currencies.reducer';
import * as CurrenciesSelectors from './currencies.selectors';

describe('Currencies Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCurrenciesId = (it: CurrenciesEntity) => it.id;
  const createCurrenciesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CurrenciesEntity);

  let state: CurrenciesPartialState;

  beforeEach(() => {
    state = {
      currencies: currenciesAdapter.setAll(
        [
          createCurrenciesEntity('PRODUCT-AAA'),
          createCurrenciesEntity('PRODUCT-BBB'),
          createCurrenciesEntity('PRODUCT-CCC'),
        ],
        {
          ...initialCurrenciesState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Currencies Selectors', () => {
    it('selectAllCurrencies() should return the list of Currencies', () => {
      const results = CurrenciesSelectors.selectAllCurrencies(state);
      const selId = getCurrenciesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = CurrenciesSelectors.selectEntity(
        state
      ) as CurrenciesEntity;
      const selId = getCurrenciesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectCurrenciesLoaded() should return the current "loaded" status', () => {
      const result = CurrenciesSelectors.selectCurrenciesLoaded(state);

      expect(result).toBe(true);
    });

    it('selectCurrenciesError() should return the current "error" state', () => {
      const result = CurrenciesSelectors.selectCurrenciesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

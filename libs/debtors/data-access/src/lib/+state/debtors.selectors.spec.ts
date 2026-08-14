import { DebtorsEntity } from './debtors.models';
import {
  debtorsAdapter,
  DebtorsPartialState,
  initialDebtorsState,
} from './debtors.reducer';
import * as DebtorsSelectors from './debtors.selectors';

describe('Debtors Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDebtorsId = (it: DebtorsEntity) => it.id;
  const createDebtorsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DebtorsEntity);

  let state: DebtorsPartialState;

  beforeEach(() => {
    state = {
      debtors: debtorsAdapter.setAll(
        [
          createDebtorsEntity('PRODUCT-AAA'),
          createDebtorsEntity('PRODUCT-BBB'),
          createDebtorsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialDebtorsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Debtors Selectors', () => {
    it('selectAllDebtors() should return the list of Debtors', () => {
      const results = DebtorsSelectors.selectAllDebtors(state);
      const selId = getDebtorsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = DebtorsSelectors.selectEntity(state) as DebtorsEntity;
      const selId = getDebtorsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectDebtorsLoaded() should return the current "loaded" status', () => {
      const result = DebtorsSelectors.selectDebtorsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectDebtorsError() should return the current "error" state', () => {
      const result = DebtorsSelectors.selectDebtorsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

import { CreditorsEntity } from './creditors.models';
import {
  creditorsAdapter,
  CreditorsPartialState,
  initialCreditorsState,
} from './creditors.reducer';
import * as CreditorsSelectors from './creditors.selectors';

describe('Creditors Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCreditorsId = (it: CreditorsEntity) => it.id;
  const createCreditorsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CreditorsEntity);

  let state: CreditorsPartialState;

  beforeEach(() => {
    state = {
      creditors: creditorsAdapter.setAll(
        [
          createCreditorsEntity('PRODUCT-AAA'),
          createCreditorsEntity('PRODUCT-BBB'),
          createCreditorsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialCreditorsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Creditors Selectors', () => {
    it('selectAllCreditors() should return the list of Creditors', () => {
      const results = CreditorsSelectors.selectAllCreditors(state);
      const selId = getCreditorsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = CreditorsSelectors.selectEntity(state) as CreditorsEntity;
      const selId = getCreditorsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectCreditorsLoaded() should return the current "loaded" status', () => {
      const result = CreditorsSelectors.selectCreditorsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectCreditorsError() should return the current "error" state', () => {
      const result = CreditorsSelectors.selectCreditorsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

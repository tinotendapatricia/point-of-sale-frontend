import { VatEntity } from './vat.models';
import { vatAdapter, VatPartialState, initialVatState } from './vat.reducer';
import * as VatSelectors from './vat.selectors';

describe('Vat Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getVatId = (it: VatEntity) => it.id;
  const createVatEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as VatEntity);

  let state: VatPartialState;

  beforeEach(() => {
    state = {
      vat: vatAdapter.setAll(
        [
          createVatEntity('PRODUCT-AAA'),
          createVatEntity('PRODUCT-BBB'),
          createVatEntity('PRODUCT-CCC'),
        ],
        {
          ...initialVatState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Vat Selectors', () => {
    it('selectAllVat() should return the list of Vat', () => {
      const results = VatSelectors.selectAllVat(state);
      const selId = getVatId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = VatSelectors.selectEntity(state) as VatEntity;
      const selId = getVatId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectVatLoaded() should return the current "loaded" status', () => {
      const result = VatSelectors.selectVatLoaded(state);

      expect(result).toBe(true);
    });

    it('selectVatError() should return the current "error" state', () => {
      const result = VatSelectors.selectVatError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

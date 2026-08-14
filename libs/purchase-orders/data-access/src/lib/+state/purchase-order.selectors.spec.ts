import { PurchaseOrderEntity } from './purchase-order.models';
import {
  purchaseOrderAdapter,
  PurchaseOrderPartialState,
  initialPurchaseOrderState,
} from './purchase-order.reducer';
import * as PurchaseOrderSelectors from './purchase-order.selectors';

describe('PurchaseOrder Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPurchaseOrderId = (it: PurchaseOrderEntity) => it.id;
  const createPurchaseOrderEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PurchaseOrderEntity);

  let state: PurchaseOrderPartialState;

  beforeEach(() => {
    state = {
      purchaseOrder: purchaseOrderAdapter.setAll(
        [
          createPurchaseOrderEntity('PRODUCT-AAA'),
          createPurchaseOrderEntity('PRODUCT-BBB'),
          createPurchaseOrderEntity('PRODUCT-CCC'),
        ],
        {
          ...initialPurchaseOrderState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('PurchaseOrder Selectors', () => {
    it('selectAllPurchaseOrder() should return the list of PurchaseOrder', () => {
      const results = PurchaseOrderSelectors.selectAllPurchaseOrder(state);
      const selId = getPurchaseOrderId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = PurchaseOrderSelectors.selectEntity(
        state
      ) as PurchaseOrderEntity;
      const selId = getPurchaseOrderId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectPurchaseOrderLoaded() should return the current "loaded" status', () => {
      const result = PurchaseOrderSelectors.selectPurchaseOrderLoaded(state);

      expect(result).toBe(true);
    });

    it('selectPurchaseOrderError() should return the current "error" state', () => {
      const result = PurchaseOrderSelectors.selectPurchaseOrderError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

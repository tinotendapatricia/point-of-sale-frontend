import { Action } from '@ngrx/store';

import * as PurchaseOrderActions from './purchase-order.actions';
import { PurchaseOrderEntity } from './purchase-order.models';
import {
  PurchaseOrderState,
  initialPurchaseOrderState,
  purchaseOrderReducer,
} from './purchase-order.reducer';

describe('PurchaseOrder Reducer', () => {
  const createPurchaseOrderEntity = (
    id: string,
    name = ''
  ): PurchaseOrderEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid PurchaseOrder actions', () => {
    it('loadPurchaseOrderSuccess should return the list of known PurchaseOrder', () => {
      const purchaseOrder = [
        createPurchaseOrderEntity('PRODUCT-AAA'),
        createPurchaseOrderEntity('PRODUCT-zzz'),
      ];
      const action = PurchaseOrderActions.loadPurchaseOrderSuccess({
        purchaseOrder,
      });

      const result: PurchaseOrderState = purchaseOrderReducer(
        initialPurchaseOrderState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = purchaseOrderReducer(initialPurchaseOrderState, action);

      expect(result).toBe(initialPurchaseOrderState);
    });
  });
});

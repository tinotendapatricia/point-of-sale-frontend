import { Action } from '@ngrx/store';

import * as VatActions from './vat.actions';
import { VatEntity } from './vat.models';
import { VatState, initialVatState, vatReducer } from './vat.reducer';

describe('Vat Reducer', () => {
  const createVatEntity = (id: string, name = ''): VatEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Vat actions', () => {
    it('loadVatSuccess should return the list of known Vat', () => {
      const vat = [
        createVatEntity('PRODUCT-AAA'),
        createVatEntity('PRODUCT-zzz'),
      ];
      const action = VatActions.loadVatSuccess({ vat });

      const result: VatState = vatReducer(initialVatState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = vatReducer(initialVatState, action);

      expect(result).toBe(initialVatState);
    });
  });
});

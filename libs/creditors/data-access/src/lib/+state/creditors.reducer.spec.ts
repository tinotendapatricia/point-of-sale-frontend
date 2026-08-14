import { Action } from '@ngrx/store';

import * as CreditorsActions from './creditors.actions';
import { CreditorsEntity } from './creditors.models';
import {
  CreditorsState,
  initialCreditorsState,
  creditorsReducer,
} from './creditors.reducer';

describe('Creditors Reducer', () => {
  const createCreditorsEntity = (id: string, name = ''): CreditorsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Creditors actions', () => {
    it('loadCreditorsSuccess should return the list of known Creditors', () => {
      const creditors = [
        createCreditorsEntity('PRODUCT-AAA'),
        createCreditorsEntity('PRODUCT-zzz'),
      ];
      const action = CreditorsActions.loadCreditorsSuccess({ creditors });

      const result: CreditorsState = creditorsReducer(
        initialCreditorsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = creditorsReducer(initialCreditorsState, action);

      expect(result).toBe(initialCreditorsState);
    });
  });
});

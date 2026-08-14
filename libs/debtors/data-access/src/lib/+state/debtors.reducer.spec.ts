import { Action } from '@ngrx/store';

import * as DebtorsActions from './debtors.actions';
import { DebtorsEntity } from './debtors.models';
import {
  DebtorsState,
  initialDebtorsState,
  debtorsReducer,
} from './debtors.reducer';

describe('Debtors Reducer', () => {
  const createDebtorsEntity = (id: string, name = ''): DebtorsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Debtors actions', () => {
    it('loadDebtorsSuccess should return the list of known Debtors', () => {
      const debtors = [
        createDebtorsEntity('PRODUCT-AAA'),
        createDebtorsEntity('PRODUCT-zzz'),
      ];
      const action = DebtorsActions.loadDebtorsSuccess({ debtors });

      const result: DebtorsState = debtorsReducer(initialDebtorsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = debtorsReducer(initialDebtorsState, action);

      expect(result).toBe(initialDebtorsState);
    });
  });
});

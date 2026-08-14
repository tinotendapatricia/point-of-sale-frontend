import { Action } from '@ngrx/store';

import * as PosActions from './pos.actions';
import { PosEntity } from './pos.models';
import { PosState, initialPosState, posReducer } from './pos.reducer';

describe('Pos Reducer', () => {
  const createPosEntity = (id: string, name = ''): PosEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Pos actions', () => {
    it('loadPosSuccess should return the list of known Pos', () => {
      const pos = [
        createPosEntity('PRODUCT-AAA'),
        createPosEntity('PRODUCT-zzz'),
      ];
      const action = PosActions.loadPosSuccess({ pos });

      const result: PosState = posReducer(initialPosState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = posReducer(initialPosState, action);

      expect(result).toBe(initialPosState);
    });
  });
});

import { Action } from '@ngrx/store';

import * as AuditsActions from './audits.actions';
import { AuditsEntity } from './audits.models';
import {
  AuditsState,
  initialAuditsState,
  auditsReducer,
} from './audits.reducer';

describe('Audits Reducer', () => {
  const createAuditsEntity = (id: string, name = ''): AuditsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Audits actions', () => {
    it('loadAuditsSuccess should return the list of known Audits', () => {
      const audits = [
        createAuditsEntity('PRODUCT-AAA'),
        createAuditsEntity('PRODUCT-zzz'),
      ];
      const action = AuditsActions.loadAuditsSuccess({ audits });

      const result: AuditsState = auditsReducer(initialAuditsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = auditsReducer(initialAuditsState, action);

      expect(result).toBe(initialAuditsState);
    });
  });
});

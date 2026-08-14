import { Action } from '@ngrx/store';

import * as StationsActions from './stations.actions';
import { StationsEntity } from './stations.models';
import {
  StationsState,
  initialStationsState,
  stationsReducer,
} from './stations.reducer';

describe('Stations Reducer', () => {
  const createStationsEntity = (id: string, name = ''): StationsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Stations actions', () => {
    it('loadStationsSuccess should return the list of known Stations', () => {
      const stations = [
        createStationsEntity('PRODUCT-AAA'),
        createStationsEntity('PRODUCT-zzz'),
      ];
      const action = StationsActions.loadStationsSuccess({ stations });

      const result: StationsState = stationsReducer(
        initialStationsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = stationsReducer(initialStationsState, action);

      expect(result).toBe(initialStationsState);
    });
  });
});

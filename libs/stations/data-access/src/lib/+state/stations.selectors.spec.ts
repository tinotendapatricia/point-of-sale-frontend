import { StationsEntity } from './stations.models';
import {
  stationsAdapter,
  StationsPartialState,
  initialStationsState,
} from './stations.reducer';
import * as StationsSelectors from './stations.selectors';

describe('Stations Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getStationsId = (it: StationsEntity) => it.id;
  const createStationsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as StationsEntity);

  let state: StationsPartialState;

  beforeEach(() => {
    state = {
      stations: stationsAdapter.setAll(
        [
          createStationsEntity('PRODUCT-AAA'),
          createStationsEntity('PRODUCT-BBB'),
          createStationsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialStationsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Stations Selectors', () => {
    it('selectAllStations() should return the list of Stations', () => {
      const results = StationsSelectors.selectAllStations(state);
      const selId = getStationsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = StationsSelectors.selectEntity(state) as StationsEntity;
      const selId = getStationsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectStationsLoaded() should return the current "loaded" status', () => {
      const result = StationsSelectors.selectStationsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectStationsError() should return the current "error" state', () => {
      const result = StationsSelectors.selectStationsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

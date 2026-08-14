import { PosEntity } from './pos.models';
import { posAdapter, PosPartialState, initialPosState } from './pos.reducer';
import * as PosSelectors from './pos.selectors';

describe('Pos Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPosId = (it: PosEntity) => it.id;
  const createPosEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PosEntity);

  let state: PosPartialState;

  beforeEach(() => {
    state = {
      pos: posAdapter.setAll(
        [
          createPosEntity('PRODUCT-AAA'),
          createPosEntity('PRODUCT-BBB'),
          createPosEntity('PRODUCT-CCC'),
        ],
        {
          ...initialPosState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Pos Selectors', () => {
    it('selectAllPos() should return the list of Pos', () => {
      const results = PosSelectors.selectAllPos(state);
      const selId = getPosId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = PosSelectors.selectEntity(state) as PosEntity;
      const selId = getPosId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectPosLoaded() should return the current "loaded" status', () => {
      const result = PosSelectors.selectPosLoaded(state);

      expect(result).toBe(true);
    });

    it('selectPosError() should return the current "error" state', () => {
      const result = PosSelectors.selectPosError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

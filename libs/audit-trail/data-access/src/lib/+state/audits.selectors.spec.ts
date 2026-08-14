import { AuditsEntity } from './audits.models';
import {
  auditsAdapter,
  AuditsPartialState,
  initialAuditsState,
} from './audits.reducer';
import * as AuditsSelectors from './audits.selectors';

describe('Audits Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAuditsId = (it: AuditsEntity) => it.id;
  const createAuditsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AuditsEntity);

  let state: AuditsPartialState;

  beforeEach(() => {
    state = {
      audits: auditsAdapter.setAll(
        [
          createAuditsEntity('PRODUCT-AAA'),
          createAuditsEntity('PRODUCT-BBB'),
          createAuditsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialAuditsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Audits Selectors', () => {
    it('selectAllAudits() should return the list of Audits', () => {
      const results = AuditsSelectors.selectAllAudits(state);
      const selId = getAuditsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = AuditsSelectors.selectEntity(state) as AuditsEntity;
      const selId = getAuditsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectAuditsLoaded() should return the current "loaded" status', () => {
      const result = AuditsSelectors.selectAuditsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectAuditsError() should return the current "error" state', () => {
      const result = AuditsSelectors.selectAuditsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

import { RolesEntity } from './roles.models';
import {
  rolesAdapter,
  RolesPartialState,
  initialRolesState,
} from './roles.reducer';
import * as RolesSelectors from './roles.selectors';

describe('Roles Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getRolesId = (it: RolesEntity) => it.id;
  const createRolesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as RolesEntity);

  let state: RolesPartialState;

  beforeEach(() => {
    state = {
      roles: rolesAdapter.setAll(
        [
          createRolesEntity('PRODUCT-AAA'),
          createRolesEntity('PRODUCT-BBB'),
          createRolesEntity('PRODUCT-CCC'),
        ],
        {
          ...initialRolesState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Roles Selectors', () => {
    it('selectAllRoles() should return the list of Roles', () => {
      const results = RolesSelectors.selectAllRoles(state);
      const selId = getRolesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = RolesSelectors.selectEntity(state) as RolesEntity;
      const selId = getRolesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectRolesLoaded() should return the current "loaded" status', () => {
      const result = RolesSelectors.selectRolesLoaded(state);

      expect(result).toBe(true);
    });

    it('selectRolesError() should return the current "error" state', () => {
      const result = RolesSelectors.selectRolesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

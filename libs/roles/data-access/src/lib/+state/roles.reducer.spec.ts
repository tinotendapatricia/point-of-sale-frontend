import { Action } from '@ngrx/store';

import * as RolesActions from './roles.actions';
import { RolesEntity } from './roles.models';
import { RolesState, initialRolesState, rolesReducer } from './roles.reducer';

describe('Roles Reducer', () => {
  const createRolesEntity = (id: string, name = ''): RolesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Roles actions', () => {
    it('loadRolesSuccess should return the list of known Roles', () => {
      const roles = [
        createRolesEntity('PRODUCT-AAA'),
        createRolesEntity('PRODUCT-zzz'),
      ];
      const action = RolesActions.loadRolesSuccess({ roles });

      const result: RolesState = rolesReducer(initialRolesState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = rolesReducer(initialRolesState, action);

      expect(result).toBe(initialRolesState);
    });
  });
});

import { Action } from '@ngrx/store';

import * as GroupsActions from './groups.actions';
import { GroupsEntity } from './groups.models';
import {
  GroupsState,
  initialGroupsState,
  groupsReducer,
} from './groups.reducer';

describe('Groups Reducer', () => {
  const createGroupsEntity = (id: string, name = ''): GroupsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Groups actions', () => {
    it('loadGroupsSuccess should return the list of known Groups', () => {
      const groups = [
        createGroupsEntity('PRODUCT-AAA'),
        createGroupsEntity('PRODUCT-zzz'),
      ];
      const action = GroupsActions.loadGroupsSuccess({ groups });

      const result: GroupsState = groupsReducer(initialGroupsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = groupsReducer(initialGroupsState, action);

      expect(result).toBe(initialGroupsState);
    });
  });
});

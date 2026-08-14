import { GroupsEntity } from './groups.models';
import {
  groupsAdapter,
  GroupsPartialState,
  initialGroupsState,
} from './groups.reducer';
import * as GroupsSelectors from './groups.selectors';

describe('Groups Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getGroupsId = (it: GroupsEntity) => it.id;
  const createGroupsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as GroupsEntity);

  let state: GroupsPartialState;

  beforeEach(() => {
    state = {
      groups: groupsAdapter.setAll(
        [
          createGroupsEntity('PRODUCT-AAA'),
          createGroupsEntity('PRODUCT-BBB'),
          createGroupsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialGroupsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Groups Selectors', () => {
    it('selectAllGroups() should return the list of Groups', () => {
      const results = GroupsSelectors.selectAllGroups(state);
      const selId = getGroupsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = GroupsSelectors.selectEntity(state) as GroupsEntity;
      const selId = getGroupsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectGroupsLoaded() should return the current "loaded" status', () => {
      const result = GroupsSelectors.selectGroupsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectGroupsError() should return the current "error" state', () => {
      const result = GroupsSelectors.selectGroupsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

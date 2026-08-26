import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as GroupsActions from './groups.actions';
import { GroupsEffects } from './groups.effects';
import { GroupsFacade } from './groups.facade';
import { GroupsEntity } from './groups.models';
import {
  GROUPS_FEATURE_KEY,
  GroupsState,
  initialGroupsState,
  groupsReducer,
} from './groups.reducer';
import * as GroupsSelectors from './groups.selectors';

interface TestSchema {
  groups: GroupsState;
}

describe('GroupsFacade', () => {
  let facade: GroupsFacade;
  let store: Store<TestSchema>;
  const createGroupsEntity = (id: string, name = ''): GroupsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(GROUPS_FEATURE_KEY, groupsReducer),
          EffectsModule.forFeature([GroupsEffects]),
        ],
        providers: [GroupsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(GroupsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allGroups$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allGroups$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadGroupsSuccess` to manually update list
     */
    it('allGroups$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allGroups$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        GroupsActions.loadGroupsSuccess({
          groups: [createGroupsEntity('AAA'), createGroupsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allGroups$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});

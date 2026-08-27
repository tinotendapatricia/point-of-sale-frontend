import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { take, Observable } from 'rxjs';

function readFirst<T>(source: Observable<T>): Promise<T> {
  return new Promise((resolve) => {
    source.pipe(take(1)).subscribe(resolve);
  });
}

import * as RolesActions from './roles.actions';
import { RolesEffects } from './roles.effects';
import { RolesFacade } from './roles.facade';
import { RolesEntity } from './roles.models';
import {
  ROLES_FEATURE_KEY,
  RolesState,
  initialRolesState,
  rolesReducer,
} from './roles.reducer';
import * as RolesSelectors from './roles.selectors';

interface TestSchema {
  roles: RolesState;
}

describe('RolesFacade', () => {
  let facade: RolesFacade;
  let store: Store<TestSchema>;
  const createRolesEntity = (id: string, name = ''): RolesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(ROLES_FEATURE_KEY, rolesReducer),
          EffectsModule.forFeature([RolesEffects]),
        ],
        providers: [RolesFacade],
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
      facade = TestBed.inject(RolesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allRoles$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allRoles$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadRolesSuccess` to manually update list
     */
    it('allRoles$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allRoles$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        RolesActions.loadRolesSuccess({
          roles: [createRolesEntity('AAA'), createRolesEntity('BBB')],
        })
      );

      list = await readFirst(facade.allRoles$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});

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

import * as PosActions from './pos.actions';
import { PosEffects } from './pos.effects';
import { PosFacade } from './pos.facade';
import { PosEntity } from './pos.models';
import {
  POS_FEATURE_KEY,
  PosState,
  initialPosState,
  posReducer,
} from './pos.reducer';
import * as PosSelectors from './pos.selectors';

interface TestSchema {
  pos: PosState;
}

describe('PosFacade', () => {
  let facade: PosFacade;
  let store: Store<TestSchema>;
  const createPosEntity = (id: string, name = ''): PosEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(POS_FEATURE_KEY, posReducer),
          EffectsModule.forFeature([PosEffects]),
        ],
        providers: [PosFacade],
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
      facade = TestBed.inject(PosFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allPos$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allPos$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadPosSuccess` to manually update list
     */
    it('allPos$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allPos$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        PosActions.loadPosSuccess({
          pos: [createPosEntity('AAA'), createPosEntity('BBB')],
        })
      );

      list = await readFirst(facade.allPos$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});

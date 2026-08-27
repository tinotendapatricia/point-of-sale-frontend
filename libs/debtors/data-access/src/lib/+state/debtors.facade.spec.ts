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

import * as DebtorsActions from './debtors.actions';
import { DebtorsEffects } from './debtors.effects';
import { DebtorsFacade } from './debtors.facade';
import { DebtorsEntity } from './debtors.models';
import {
  DEBTORS_FEATURE_KEY,
  DebtorsState,
  initialDebtorsState,
  debtorsReducer,
} from './debtors.reducer';
import * as DebtorsSelectors from './debtors.selectors';

interface TestSchema {
  debtors: DebtorsState;
}

describe('DebtorsFacade', () => {
  let facade: DebtorsFacade;
  let store: Store<TestSchema>;
  const createDebtorsEntity = (id: string, name = ''): DebtorsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(DEBTORS_FEATURE_KEY, debtorsReducer),
          EffectsModule.forFeature([DebtorsEffects]),
        ],
        providers: [DebtorsFacade],
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
      facade = TestBed.inject(DebtorsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allDebtors$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allDebtors$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadDebtorsSuccess` to manually update list
     */
    it('allDebtors$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allDebtors$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        DebtorsActions.loadDebtorsSuccess({
          debtors: [createDebtorsEntity('AAA'), createDebtorsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allDebtors$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});

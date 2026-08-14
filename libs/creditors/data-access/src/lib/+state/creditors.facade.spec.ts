import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as CreditorsActions from './creditors.actions';
import { CreditorsEffects } from './creditors.effects';
import { CreditorsFacade } from './creditors.facade';
import { CreditorsEntity } from './creditors.models';
import {
  CREDITORS_FEATURE_KEY,
  CreditorsState,
  initialCreditorsState,
  creditorsReducer,
} from './creditors.reducer';
import * as CreditorsSelectors from './creditors.selectors';

interface TestSchema {
  creditors: CreditorsState;
}

describe('CreditorsFacade', () => {
  let facade: CreditorsFacade;
  let store: Store<TestSchema>;
  const createCreditorsEntity = (id: string, name = ''): CreditorsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CREDITORS_FEATURE_KEY, creditorsReducer),
          EffectsModule.forFeature([CreditorsEffects]),
        ],
        providers: [CreditorsFacade],
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
      facade = TestBed.inject(CreditorsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allCreditors$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allCreditors$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadCreditorsSuccess` to manually update list
     */
    it('allCreditors$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allCreditors$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        CreditorsActions.loadCreditorsSuccess({
          creditors: [
            createCreditorsEntity('AAA'),
            createCreditorsEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allCreditors$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});

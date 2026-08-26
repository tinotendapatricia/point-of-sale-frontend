import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as CurrenciesActions from './currencies.actions';
import { CurrenciesEffects } from './currencies.effects';
import { CurrenciesFacade } from './currencies.facade';
import { CurrenciesEntity } from './currencies.models';
import {
  CURRENCIES_FEATURE_KEY,
  CurrenciesState,
  initialCurrenciesState,
  currenciesReducer,
} from './currencies.reducer';
import * as CurrenciesSelectors from './currencies.selectors';

interface TestSchema {
  currencies: CurrenciesState;
}

describe('CurrenciesFacade', () => {
  let facade: CurrenciesFacade;
  let store: Store<TestSchema>;
  const createCurrenciesEntity = (id: string, name = ''): CurrenciesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CURRENCIES_FEATURE_KEY, currenciesReducer),
          EffectsModule.forFeature([CurrenciesEffects]),
        ],
        providers: [CurrenciesFacade],
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
      facade = TestBed.inject(CurrenciesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allCurrencies$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allCurrencies$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadCurrenciesSuccess` to manually update list
     */
    it('allCurrencies$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allCurrencies$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        CurrenciesActions.loadCurrenciesSuccess({
          currencies: [
            createCurrenciesEntity('AAA'),
            createCurrenciesEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allCurrencies$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});

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

import * as VatActions from './vat.actions';
import { VatEffects } from './vat.effects';
import { VatFacade } from './vat.facade';
import { VatEntity } from './vat.models';
import {
  VAT_FEATURE_KEY,
  VatState,
  initialVatState,
  vatReducer,
} from './vat.reducer';
import * as VatSelectors from './vat.selectors';

interface TestSchema {
  vat: VatState;
}

describe('VatFacade', () => {
  let facade: VatFacade;
  let store: Store<TestSchema>;
  const createVatEntity = (id: string, name = ''): VatEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(VAT_FEATURE_KEY, vatReducer),
          EffectsModule.forFeature([VatEffects]),
        ],
        providers: [VatFacade],
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
      facade = TestBed.inject(VatFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allVat$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allVat$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadVatSuccess` to manually update list
     */
    it('allVat$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allVat$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        VatActions.loadVatSuccess({
          vat: [createVatEntity('AAA'), createVatEntity('BBB')],
        })
      );

      list = await readFirst(facade.allVat$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});

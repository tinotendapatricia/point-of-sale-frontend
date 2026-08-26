import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as PurchaseOrderActions from './purchase-order.actions';
import { PurchaseOrderEffects } from './purchase-order.effects';
import { PurchaseOrderFacade } from './purchase-order.facade';
import { PurchaseOrderEntity } from './purchase-order.models';
import {
  PURCHASE_ORDER_FEATURE_KEY,
  PurchaseOrderState,
  initialPurchaseOrderState,
  purchaseOrderReducer,
} from './purchase-order.reducer';
import * as PurchaseOrderSelectors from './purchase-order.selectors';

interface TestSchema {
  purchaseOrder: PurchaseOrderState;
}

describe('PurchaseOrderFacade', () => {
  let facade: PurchaseOrderFacade;
  let store: Store<TestSchema>;
  const createPurchaseOrderEntity = (
    id: string,
    name = ''
  ): PurchaseOrderEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(
            PURCHASE_ORDER_FEATURE_KEY,
            purchaseOrderReducer
          ),
          EffectsModule.forFeature([PurchaseOrderEffects]),
        ],
        providers: [PurchaseOrderFacade],
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
      facade = TestBed.inject(PurchaseOrderFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allPurchaseOrder$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allPurchaseOrder$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadPurchaseOrderSuccess` to manually update list
     */
    it('allPurchaseOrder$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allPurchaseOrder$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        PurchaseOrderActions.loadPurchaseOrderSuccess({
          purchaseOrder: [
            createPurchaseOrderEntity('AAA'),
            createPurchaseOrderEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allPurchaseOrder$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});

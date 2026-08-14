import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as PurchaseOrderActions from './purchase-order.actions';
import { PurchaseOrderEffects } from './purchase-order.effects';

describe('PurchaseOrderEffects', () => {
  let actions: Observable<Action>;
  let effects: PurchaseOrderEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PurchaseOrderEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(PurchaseOrderEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: PurchaseOrderActions.initPurchaseOrder() });

      const expected = hot('-a-|', {
        a: PurchaseOrderActions.loadPurchaseOrderSuccess({ purchaseOrder: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});

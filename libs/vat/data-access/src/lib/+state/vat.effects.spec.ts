import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as VatActions from './vat.actions';
import { VatEffects } from './vat.effects';

describe('VatEffects', () => {
  let actions: Observable<Action>;
  let effects: VatEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        VatEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(VatEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: VatActions.initVat() });

      const expected = hot('-a-|', {
        a: VatActions.loadVatSuccess({ vat: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});

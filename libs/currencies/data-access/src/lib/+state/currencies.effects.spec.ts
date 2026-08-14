import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as CurrenciesActions from './currencies.actions';
import { CurrenciesEffects } from './currencies.effects';

describe('CurrenciesEffects', () => {
  let actions: Observable<Action>;
  let effects: CurrenciesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CurrenciesEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CurrenciesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CurrenciesActions.initCurrencies() });

      const expected = hot('-a-|', {
        a: CurrenciesActions.loadCurrenciesSuccess({ currencies: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});

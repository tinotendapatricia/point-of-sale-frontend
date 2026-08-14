import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as DebtorsActions from './debtors.actions';
import { DebtorsEffects } from './debtors.effects';

describe('DebtorsEffects', () => {
  let actions: Observable<Action>;
  let effects: DebtorsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        DebtorsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(DebtorsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DebtorsActions.initDebtors() });

      const expected = hot('-a-|', {
        a: DebtorsActions.loadDebtorsSuccess({ debtors: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});

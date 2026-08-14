import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as CreditorsActions from './creditors.actions';
import { CreditorsEffects } from './creditors.effects';

describe('CreditorsEffects', () => {
  let actions: Observable<Action>;
  let effects: CreditorsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CreditorsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CreditorsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CreditorsActions.initCreditors() });

      const expected = hot('-a-|', {
        a: CreditorsActions.loadCreditorsSuccess({ creditors: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});

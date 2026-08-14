import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as AuditsActions from './audits.actions';
import { AuditsEffects } from './audits.effects';

describe('AuditsEffects', () => {
  let actions: Observable<Action>;
  let effects: AuditsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuditsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(AuditsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: AuditsActions.initAudits() });

      const expected = hot('-a-|', {
        a: AuditsActions.loadAuditsSuccess({ audits: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as PosActions from './pos.actions';
import { PosEffects } from './pos.effects';

describe('PosEffects', () => {
  let actions: Observable<Action>;
  let effects: PosEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PosEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(PosEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: PosActions.initPos() });

      const expected = hot('-a-|', {
        a: PosActions.loadPosSuccess({ pos: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});

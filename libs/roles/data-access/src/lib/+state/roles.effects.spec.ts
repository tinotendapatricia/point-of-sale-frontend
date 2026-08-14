import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as RolesActions from './roles.actions';
import { RolesEffects } from './roles.effects';

describe('RolesEffects', () => {
  let actions: Observable<Action>;
  let effects: RolesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        RolesEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(RolesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: RolesActions.initRoles() });

      const expected = hot('-a-|', {
        a: RolesActions.loadRolesSuccess({ roles: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});

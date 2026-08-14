import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as GroupsActions from './groups.actions';
import { GroupsEffects } from './groups.effects';

describe('GroupsEffects', () => {
  let actions: Observable<Action>;
  let effects: GroupsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        GroupsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(GroupsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: GroupsActions.initGroups() });

      const expected = hot('-a-|', {
        a: GroupsActions.loadGroupsSuccess({ groups: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});

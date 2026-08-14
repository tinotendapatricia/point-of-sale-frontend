import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as StationsActions from './stations.actions';
import { StationsEffects } from './stations.effects';

describe('StationsEffects', () => {
  let actions: Observable<Action>;
  let effects: StationsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        StationsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(StationsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: StationsActions.initStations() });

      const expected = hot('-a-|', {
        a: StationsActions.loadStationsSuccess({ stations: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});

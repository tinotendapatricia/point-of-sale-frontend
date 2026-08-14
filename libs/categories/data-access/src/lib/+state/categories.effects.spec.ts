import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as CategoriesActions from './categories.actions';
import { CategoriesEffects } from './categories.effects';

describe('CategoriesEffects', () => {
  let actions: Observable<Action>;
  let effects: CategoriesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CategoriesEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CategoriesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CategoriesActions.initCategories() });

      const expected = hot('-a-|', {
        a: CategoriesActions.loadCategoriesSuccess({ categories: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});

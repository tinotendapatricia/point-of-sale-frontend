import { Action } from '@ngrx/store';

import * as CategoriesActions from './categories.actions';
import { CategoriesEntity } from './categories.models';
import {
  CategoriesState,
  initialCategoriesState,
  categoriesReducer,
} from './categories.reducer';

describe('Categories Reducer', () => {
  const createCategoriesEntity = (id: string, name = ''): CategoriesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Categories actions', () => {
    it('loadCategoriesSuccess should return the list of known Categories', () => {
      const categories = [
        createCategoriesEntity('PRODUCT-AAA'),
        createCategoriesEntity('PRODUCT-zzz'),
      ];
      const action = CategoriesActions.loadCategoriesSuccess({ categories });

      const result: CategoriesState = categoriesReducer(
        initialCategoriesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = categoriesReducer(initialCategoriesState, action);

      expect(result).toBe(initialCategoriesState);
    });
  });
});

import { CategoriesEntity } from './categories.models';
import {
  categoriesAdapter,
  CategoriesPartialState,
  initialCategoriesState,
} from './categories.reducer';
import * as CategoriesSelectors from './categories.selectors';

describe('Categories Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCategoriesId = (it: CategoriesEntity) => it.id;
  const createCategoriesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CategoriesEntity);

  let state: CategoriesPartialState;

  beforeEach(() => {
    state = {
      categories: categoriesAdapter.setAll(
        [
          createCategoriesEntity('PRODUCT-AAA'),
          createCategoriesEntity('PRODUCT-BBB'),
          createCategoriesEntity('PRODUCT-CCC'),
        ],
        {
          ...initialCategoriesState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Categories Selectors', () => {
    it('selectAllCategories() should return the list of Categories', () => {
      const results = CategoriesSelectors.selectAllCategories(state);
      const selId = getCategoriesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = CategoriesSelectors.selectEntity(
        state
      ) as CategoriesEntity;
      const selId = getCategoriesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectCategoriesLoaded() should return the current "loaded" status', () => {
      const result = CategoriesSelectors.selectCategoriesLoaded(state);

      expect(result).toBe(true);
    });

    it('selectCategoriesError() should return the current "error" state', () => {
      const result = CategoriesSelectors.selectCategoriesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

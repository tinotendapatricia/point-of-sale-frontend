import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CATEGORIES_FEATURE_KEY,
  CategoriesState,
  categoriesAdapter,
} from './categories.reducer';

// Lookup the 'Categories' feature state managed by NgRx
export const selectCategoriesState = createFeatureSelector<CategoriesState>(
  CATEGORIES_FEATURE_KEY
);

const { selectAll, selectEntities } = categoriesAdapter.getSelectors();

export const selectCategoriesLoaded = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.loaded
);

export const selectCategoriesError = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.error
);

export const selectAllCategories = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => selectAll(state)
);

export const selectCategoriesEntities = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.selectedId
);

export const getSelected = (categorieId: string | number) =>
  createSelector(selectCategoriesEntities, (entities) => entities[categorieId]);

export const getSelectedCategorie = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.selectedCategorie
);

export const getTotalCategories = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.total
);

export const getCurrentPageState = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.currentPage
);

export const getCategoriesLoadingState = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.loading
);

export const getBtnState = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.btnState
);

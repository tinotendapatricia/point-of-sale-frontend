import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CategoriesActions from './categories.actions';
import { CategoriesEntity } from './categories.models';
import { LoadingState } from '@pos-frontend/shared/utils';

export const CATEGORIES_FEATURE_KEY = 'categories';

export interface CategoriesState extends EntityState<CategoriesEntity> {
  selectedId?: string | number;
  loaded?: boolean;
  loading: boolean;
  error?: Error;
  selectedCategorie: CategoriesEntity | undefined;
  total: number;
  btnState: LoadingState;
  currentPage: number;
}

export interface CategoriesPartialState {
  readonly [CATEGORIES_FEATURE_KEY]: CategoriesState;
}

export const categoriesAdapter: EntityAdapter<CategoriesEntity> =
  createEntityAdapter<CategoriesEntity>();

export const initialCategoriesState: CategoriesState =
  categoriesAdapter.getInitialState({
    loaded: false,
    loading: false,
    error: undefined,
    selectedCategorie: undefined,
    total: 0,
    btnState: LoadingState.DEFAULT,
    currentPage: 0,
  });

const reducer = createReducer(
  initialCategoriesState,
  on(
    CategoriesActions.getCategorieById,
    CategoriesActions.getPaginatedCategories,
    CategoriesActions.getAllCategories,
    (state) => ({
      ...state,
      loading: true,
    })
  ),

  on(CategoriesActions.getCategorieByIdSuccess, (state, { categorie }) => ({
    ...state,
    loading: false,
    loaded: true,
    selectedCategorie: categorie,
  })),

  on(CategoriesActions.getAllCategoriesSuccess, (state, { categories }) =>
    categoriesAdapter.setAll(categories, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),

  on(
    CategoriesActions.getPaginatedCategoriesSuccess,
    (state, { categories, total, page }) =>
      categoriesAdapter.setAll(categories, {
        ...state,
        loading: false,
        loaded: true,
        total: total,
        currentPage: page,
      })
  ),

  on(
    CategoriesActions.getAllCategoriesFailure,
    CategoriesActions.getCategorieByIdFailure,
    CategoriesActions.getPaginatedCategoriesFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error,
    })
  ),

  on(
    CategoriesActions.createCategorie,
    CategoriesActions.updateCategorie,
    CategoriesActions.deleteCategorie,
    CategoriesActions.assignCategorieRoles,
    (state) => ({
      ...state,
      btnState: LoadingState.LOADING,
      loaded: false,
      error: undefined,
    })
  ),

  on(
    CategoriesActions.createCategorieSuccess,
    CategoriesActions.updateCategorieSuccess,
    CategoriesActions.deleteCategorieSuccess,
    CategoriesActions.assignCategorieRolesSuccess,
    (state) => ({
      ...state,
      loaded: true,
      btnState: LoadingState.SUCCESS,
    })
  ),

  on(
    CategoriesActions.createCategorieFailure,
    CategoriesActions.updateCategorieFailure,
    CategoriesActions.deleteCategorieFailure,
    CategoriesActions.assignCategorieRolesFailure,
    (state, { error }) => ({
      ...state,
      error: error,
      btnState: LoadingState.ERROR,
    })
  )
);

export function categoriesReducer(
  state: CategoriesState | undefined,
  action: Action
) {
  return reducer(state, action);
}

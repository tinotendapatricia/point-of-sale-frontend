import { createAction, props } from '@ngrx/store';
import { CategoriesEntity } from './categories.models';
import { DatagridState } from '@pos-frontend/shared/utils';

export const getPaginatedCategories = createAction(
  '[User Manager/Categories] Get Paginated Categories',
  props<{ state: DatagridState }>()
);

export const getPaginatedCategoriesSuccess = createAction(
  '[User Manager/Categories] Get Paginated Categories Success',
  props<{ categories: CategoriesEntity[]; total: number; page: number }>()
);

export const getPaginatedCategoriesFailure = createAction(
  '[User Manager/Categories] Get Paginated Categories Failure',
  props<{ error: Error }>()
);

export const getAllCategories = createAction(
  '[User Manager/Categories] Get All Categories'
);

export const getAllCategoriesSuccess = createAction(
  '[User Manager/Categories] Get All Categories Success',
  props<{ categories: CategoriesEntity[] }>()
);

export const getAllCategoriesFailure = createAction(
  '[User Manager/Categories] Get All Categories Failure',
  props<{ error: Error }>()
);

export const getCategorieById = createAction(
  '[User Manager/Categories] Get Categorie',
  props<{ categorieId: string | number }>()
);

export const getCategorieByIdSuccess = createAction(
  '[User Manager/Categories] Get Categorie Success',
  props<{ categorie: CategoriesEntity }>()
);

export const getCategorieByIdFailure = createAction(
  '[User Manager/Categories] Get Categorie Failure',
  props<{ error: any }>()
);

export const createCategorie = createAction(
  '[User Manager/Categories] Create Categorie',
  (categorieDetails: CategoriesEntity) => ({ categorieDetails })
);

export const createCategorieSuccess = createAction(
  '[User Manager/Categories] Create Categorie Success',
  (categorieDetails: CategoriesEntity) => ({ categorieDetails })
);

export const createCategorieFailure = createAction(
  '[User Manager/Categories] Create Categorie Failure',
  props<{ error: Error }>()
);

export const deleteCategorie = createAction(
  '[User Manager/Categories] Delete Categorie',
  props<{ categorieId: string | number }>()
);

export const deleteCategorieSuccess = createAction(
  '[User Manager/Categories] Delete Categorie Success'
);

export const deleteCategorieFailure = createAction(
  '[User Manager/Categories] Delete Categorie Failure',
  props<{ error: Error }>()
);

export const updateCategorie = createAction(
  '[User Manager/Categories] Update Categorie',
  (categorieDetails: CategoriesEntity) => ({ categorieDetails })
);

export const updateCategorieSuccess = createAction(
  '[User Manager/Categories] Update Categorie Success',
  (categorieDetails: CategoriesEntity) => ({ categorieDetails })
);

export const updateCategorieFailure = createAction(
  '[User Manager/Categories] Update Categorie Failure',
  props<{ error: Error }>()
);

export const assignCategorieRoles = createAction(
  '[User Manager/Categories] Assign Categorie Roles',
  (categorieDetails: CategoriesEntity) => ({ categorieDetails })
);

export const assignCategorieRolesSuccess = createAction(
  '[User Manager/Categories] Assign Categorie Roles Success',
  (categorieDetails: CategoriesEntity) => ({ categorieDetails })
);

export const assignCategorieRolesFailure = createAction(
  '[User Manager/Categories] Assign Categorie Roles Failure',
  props<{ error: Error }>()
);

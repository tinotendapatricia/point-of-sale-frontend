import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Utilities } from '@pos-frontend/shared/utils';
import {
  switchMap,
  catchError,
  of,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  tap,
  withLatestFrom,
} from 'rxjs';

import { CategoriesService } from '../services/categories.service';
import * as CategoriesActions from './categories.actions';
import * as CategoriesFeature from './categories.reducer';
import * as CategoriesSelectors from './categories.selectors'

@Injectable()
export class CategoriesEffects {
  loadCategorie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.getCategorieById),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(CategoriesSelectors.getSelected(action.categorieId)))
          )
        )
      ),
      switchMap(([action, cachedCategorie]) => {
        if (cachedCategorie)
          return of(
            CategoriesActions.getCategorieByIdSuccess({
              categorie: cachedCategorie,
            })
          );

        return this.categoriesService.getCategorie(action.categorieId).pipe(
          map((categorie) => CategoriesActions.getCategorieByIdSuccess({ categorie })),
          catchError((error) =>
            of(CategoriesActions.getCategorieByIdFailure({ error }))
          )
        );
      })
    )
  );

  loadAllCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.getAllCategories),
      exhaustMap(() =>
        this.categoriesService.getAllCategories().pipe(
          map((categories) => CategoriesActions.getAllCategoriesSuccess({ categories })),
          catchError((error) =>
            of(CategoriesActions.getAllCategoriesFailure({ error }))
          )
        )
      )
    )
  );

  loadCategorieList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.getPaginatedCategories),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(CategoriesSelectors.getCurrentPageState))
          )
        )
      ),
      exhaustMap(([action, page]) =>
        this.categoriesService
          .getPaginatedCategories(
            Utilities.formatDatagridState(
              action.state,
              action.state.page
                ? action.state.page.from! / action.state.page.size!
                : page
            )
          )
          .pipe(
            map((categoriesObject) =>
              CategoriesActions.getPaginatedCategoriesSuccess({
                categories: categoriesObject.content,
                total: categoriesObject.totalElements,
                page: categoriesObject.page,
              })
            ),
            catchError((error) =>
              of(CategoriesActions.getPaginatedCategoriesFailure({ error }))
            )
          )
      )
    )
  );

  createCategorie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.createCategorie),
      mergeMap((action) =>
        this.categoriesService.createCategorie(action.categorieDetails).pipe(
          map((categorie) => CategoriesActions.createCategorieSuccess(categorie)),
          catchError((error) => of(CategoriesActions.createCategorieFailure({ error })))
        )
      )
    )
  );

  updateCategorie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.updateCategorie),
      mergeMap((action) =>
        this.categoriesService.updateCategorie(action.categorieDetails).pipe(
          map((categorie) => CategoriesActions.updateCategorieSuccess(categorie)),
          catchError((error) => of(CategoriesActions.updateCategorieFailure({ error })))
        )
      )
    )
  );

  assignCategorieRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.assignCategorieRoles),
      mergeMap((action) =>
        this.categoriesService.assignCategorieRoles(action.categorieDetails).pipe(
          map((categorie) => CategoriesActions.assignCategorieRolesSuccess(categorie)),
          catchError((error) =>
            of(CategoriesActions.assignCategorieRolesFailure({ error }))
          )
        )
      )
    )
  );

  deleteCategorie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.deleteCategorie),
      mergeMap((action) =>
        this.categoriesService.deleteCategorie(action.categorieId).pipe(
          map(() => CategoriesActions.deleteCategorieSuccess()),
          catchError((error) => of(CategoriesActions.deleteCategorieFailure({ error })))
        )
      )
    )
  );

  onSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CategoriesActions.createCategorieSuccess,
          CategoriesActions.updateCategorieSuccess,
          CategoriesActions.deleteCategorieSuccess
        ),
        tap(() => Utilities.displayToast('success'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService,
    private store: Store<CategoriesFeature.CategoriesPartialState>
  ) {}
}

import {
  setError,
  setLoaded,
  setLoading,
  withCallState,
  withDevtools,
  withReset,
} from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe, switchMap, tap } from 'rxjs';

import {
  ToastService,
  type RxMethodInputWithCallback,
} from '@pos-frontend/core';
import { type Page } from '@pos-frontend/shared/data-access';

import {
  type AssignCategoryRolesRequest,
  type CategoryEntity,
  type CategoryFilters,
  type CreateCategoryRequest,
} from './category.model';
import { CategoryService } from './category.service';

interface State {
  category: CategoryEntity | undefined;
  categories: CategoryEntity[];
  categoriesPage: Page<CategoryEntity> | undefined;
}

const initialState: State = {
  category: undefined,
  categories: [],
  categoriesPage: undefined,
};

export const CategoryStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withDevtools('categories'),
  withReset(),
  withCallState({
    collections: [
      'getPaginated',
      'create',
      'assign',
      'getOne',
      'update',
      'delete',
      'getMany',
    ],
  }),

  withComputed(({ categoriesPage }) => ({
    paginatedCategories: computed(() => categoriesPage()?.content ?? []),
    totalCategories: computed(() => categoriesPage()?.totalElements ?? 0),
  })),

  withMethods(
    (
      store,
      service = inject(CategoryService),
      toast = inject(ToastService)
    ) => ({
      getPaginatedCategories: rxMethod<CategoryFilters | void>(
        pipe(
          tap(() => patchState(store, setLoading('getPaginated'))),
          switchMap((filters) =>
            service.getPaginatedCategories(filters ?? undefined).pipe(
              tapResponse({
                next: (categoriesPage) => {
                  patchState(
                    store,
                    { categoriesPage },
                    setLoaded('getPaginated')
                  );
                },
                error: (error) => {
                  patchState(store, setError(error, 'getPaginated'));
                },
              })
            )
          )
        )
      ),

      createCategory: rxMethod<
        RxMethodInputWithCallback<CreateCategoryRequest>
      >(
        pipe(
          tap(() => patchState(store, setLoading('create'))),
          exhaustMap((request) =>
            service.createCategory(request.data).pipe(
              tapResponse({
                next: (category) => {
                  patchState(store, { category }, setLoaded('create'));
                  toast.success('Category created successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'create'));
                  toast.warning('Failed to create category');
                },
              })
            )
          )
        )
      ),

      assignCategoryRoles: rxMethod<
        RxMethodInputWithCallback<AssignCategoryRolesRequest>
      >(
        pipe(
          tap(() => patchState(store, setLoading('assign'))),
          exhaustMap((request) =>
            service.assignCategoryRoles(request.data).pipe(
              tapResponse({
                next: (category) => {
                  patchState(store, { category }, setLoaded('assign'));
                  toast.success('Category roles assigned successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'assign'));
                  toast.warning('Failed to assign category roles');
                },
              })
            )
          )
        )
      ),

      getCategory: rxMethod<{ id: string | number }>(
        pipe(
          tap(() => patchState(store, setLoading('getOne'))),
          switchMap(({ id }) =>
            service.getCategory(id).pipe(
              tapResponse({
                next: (category) => {
                  patchState(store, { category }, setLoaded('getOne'));
                },
                error: (error) => {
                  patchState(store, setError(error, 'getOne'));
                },
              })
            )
          )
        )
      ),

      updateCategory: rxMethod<RxMethodInputWithCallback<CategoryEntity>>(
        pipe(
          tap(() => patchState(store, setLoading('update'))),
          exhaustMap((request) =>
            service.updateCategory(request.data).pipe(
              tapResponse({
                next: (category) => {
                  patchState(store, { category }, setLoaded('update'));
                  toast.success('Category updated successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'update'));
                  toast.warning('Failed to update category');
                },
              })
            )
          )
        )
      ),

      deleteCategory: rxMethod<RxMethodInputWithCallback<string | number>>(
        pipe(
          tap(() => patchState(store, setLoading('delete'))),
          exhaustMap((request) =>
            service.deleteCategory(request.data).pipe(
              tapResponse({
                next: () => {
                  patchState(
                    store,
                    { category: undefined },
                    setLoaded('delete')
                  );
                  toast.success('Category deleted successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'delete'));
                  toast.warning('Failed to delete category');
                },
              })
            )
          )
        )
      ),

      getAllCategories: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading('getMany'))),
          switchMap(() =>
            service.getAllCategories().pipe(
              tapResponse({
                next: (categories) => {
                  patchState(store, { categories }, setLoaded('getMany'));
                },
                error: (error) => {
                  patchState(store, setError(error, 'getMany'));
                },
              })
            )
          )
        )
      ),
    })
  )
);

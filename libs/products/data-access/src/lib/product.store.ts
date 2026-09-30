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
  type BreakProductRequest,
  type CreateProductRequest,
  type ProductFilters,
  type ProductsEntity,
  type UpdateCostRequest,
  type UpdatePriceRequest,
} from './product.model';
import { ProductService } from './product.service';

interface State {
  product: ProductsEntity | undefined;
  products: ProductsEntity[];
  productsPage: Page<ProductsEntity> | undefined;
}

const initialState: State = {
  product: undefined,
  products: [],
  productsPage: undefined,
};

export const ProductStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withDevtools('products'),
  withReset(),
  withCallState({
    collections: [
      'getPaginated',
      'create',
      'break',
      'getOne',
      'update',
      'delete',
      'getMany',
    ],
  }),

  withComputed(({ productsPage }) => ({
    paginatedProducts: computed(() => productsPage()?.content ?? []),
    totalProducts: computed(() => productsPage()?.totalElements ?? 0),
  })),

  withMethods(
    (
      store,
      service = inject(ProductService),
      toast = inject(ToastService)
    ) => ({
      getPaginatedProducts: rxMethod<ProductFilters | void>(
        pipe(
          tap(() => patchState(store, setLoading('getPaginated'))),
          switchMap((filters) =>
            service.getPaginatedProducts(filters ?? undefined).pipe(
              tapResponse({
                next: (productsPage) => {
                  patchState(
                    store,
                    { productsPage },
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

      createProduct: rxMethod<RxMethodInputWithCallback<CreateProductRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('create'))),
          exhaustMap((request) =>
            service.createProduct(request.data).pipe(
              tapResponse({
                next: (product) => {
                  patchState(store, { product }, setLoaded('create'));
                  toast.success('Product created successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'create'));
                  toast.warning('Failed to create product');
                },
              })
            )
          )
        )
      ),

      breakProduct: rxMethod<RxMethodInputWithCallback<BreakProductRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('break'))),
          exhaustMap((request) =>
            service.breakProduct(request.data).pipe(
              tapResponse({
                next: (product) => {
                  patchState(store, { product }, setLoaded('break'));
                  toast.success('Product broken down successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'break'));
                  toast.warning('Failed to break down product');
                },
              })
            )
          )
        )
      ),

      getProduct: rxMethod<{ id: string | number }>(
        pipe(
          tap(() => patchState(store, setLoading('getOne'))),
          switchMap(({ id }) =>
            service.getProduct(id).pipe(
              tapResponse({
                next: (product) => {
                  patchState(store, { product }, setLoaded('getOne'));
                },
                error: (error) => {
                  patchState(store, setError(error, 'getOne'));
                },
              })
            )
          )
        )
      ),

      updateProduct: rxMethod<RxMethodInputWithCallback<ProductsEntity>>(
        pipe(
          tap(() => patchState(store, setLoading('update'))),
          exhaustMap((request) =>
            service.updateProduct(request.data).pipe(
              tapResponse({
                next: (product) => {
                  patchState(store, { product }, setLoaded('update'));
                  toast.success('Product updated successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'update'));
                  toast.warning('Failed to update product');
                },
              })
            )
          )
        )
      ),

      updateCost: rxMethod<RxMethodInputWithCallback<UpdateCostRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('update'))),
          exhaustMap((request) =>
            service.updateCost(request.data).pipe(
              tapResponse({
                next: (product) => {
                  patchState(store, { product }, setLoaded('update'));
                  toast.success('Cost updated successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'update'));
                  toast.warning('Failed to update cost');
                },
              })
            )
          )
        )
      ),

      updatePrice: rxMethod<RxMethodInputWithCallback<UpdatePriceRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('update'))),
          exhaustMap((request) =>
            service.updatePrice(request.data).pipe(
              tapResponse({
                next: (product) => {
                  patchState(store, { product }, setLoaded('update'));
                  toast.success('Price updated successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'update'));
                  toast.warning('Failed to update price');
                },
              })
            )
          )
        )
      ),

      deleteProduct: rxMethod<RxMethodInputWithCallback<string | number>>(
        pipe(
          tap(() => patchState(store, setLoading('delete'))),
          exhaustMap((request) =>
            service.deleteProduct(request.data).pipe(
              tapResponse({
                next: () => {
                  patchState(
                    store,
                    { product: undefined },
                    setLoaded('delete')
                  );
                  toast.success('Product deleted successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'delete'));
                  toast.warning('Failed to delete product');
                },
              })
            )
          )
        )
      ),

      getAllProducts: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading('getMany'))),
          switchMap(() =>
            service.getAllProducts().pipe(
              tapResponse({
                next: (products) => {
                  patchState(store, { products }, setLoaded('getMany'));
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

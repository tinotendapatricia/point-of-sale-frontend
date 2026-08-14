import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
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
import { ProductsSelectors } from '../..';
import { ProductsService } from '../services/products.service';
import * as ProductsActions from './products.actions';
import * as ProductsFeature from './products.reducer';
import { Utilities } from '@pos-frontend/shared/utils';
@Injectable()
export class ProductsEffects {
  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getProductById),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(
              select(ProductsSelectors.getSelected(action.productId))
            )
          )
        )
      ),
      switchMap(([action, cachedProduct]) => {
        if (cachedProduct)
          return of(
            ProductsActions.getProductByIdSuccess({
              product: cachedProduct,
            })
          );

        return this.productsService.getProduct(action.productId).pipe(
          map((product) => ProductsActions.getProductByIdSuccess({ product })),
          catchError((error) =>
            of(ProductsActions.getProductByIdFailure({ error }))
          )
        );
      })
    )
  );

  loadAllProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getAllProducts),
      exhaustMap(() =>
        this.productsService.getAllProducts().pipe(
          map((products) =>
            ProductsActions.getAllProductsSuccess({ products })
          ),
          catchError((error) =>
            of(ProductsActions.getAllProductsFailure({ error }))
          )
        )
      )
    )
  );

  loadProductList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getPaginatedProducts),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(ProductsSelectors.getCurrentPageState))
          )
        )
      ),
      exhaustMap(([action, page]) =>
        this.productsService
          .getPaginatedProducts(
            Utilities.formatDatagridState(
              action.state,
              action.state.page
                ? action.state.page.from! / action.state.page.size!
                : page
            )
          )
          .pipe(
            map((productsObject) =>
              ProductsActions.getPaginatedProductsSuccess({
                products: productsObject.content,
                total: productsObject.totalElements,
                page: productsObject.page,
              })
            ),
            catchError((error) =>
              of(ProductsActions.getPaginatedProductsFailure({ error }))
            )
          )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.createProduct),
      mergeMap((action) =>
        this.productsService.createProduct(action.productDetails).pipe(
          map((product) => ProductsActions.createProductSuccess(product)),
          catchError((error) =>
            of(ProductsActions.createProductFailure({ error }))
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.updateProduct),
      mergeMap((action) =>
        this.productsService.updateProduct(action.productDetails).pipe(
          map((product) => ProductsActions.updateProductSuccess(product)),
          catchError((error) =>
            of(ProductsActions.updateProductFailure({ error }))
          )
        )
      )
    )
  );

  updateCost$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductsActions.updateCost),
    mergeMap((action) =>
      this.productsService.updateCost(action.productDetails).pipe(
        map((product) => ProductsActions.updateCostSuccess(product)),
        catchError((error) =>
          of(ProductsActions.updateCostFailure({ error }))
        )
      )
    )
  )
);

updatePrice$ = createEffect(() =>
this.actions$.pipe(
  ofType(ProductsActions.updatePrice),
  mergeMap((action) =>
    this.productsService.updatePrice(action.productDetails).pipe(
      map((product) => ProductsActions.updatePriceSuccess(product)),
      catchError((error) =>
        of(ProductsActions.updatePriceFailure({ error }))
      )
    )
  )
)
);





  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      mergeMap((action) =>
        this.productsService.deleteProduct(action.productId).pipe(
          map(() => ProductsActions.deleteProductSuccess()),
          catchError((error) =>
            of(ProductsActions.deleteProductFailure({ error }))
          )
        )
      )
    )
  );

  onSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ProductsActions.createProductSuccess,
          ProductsActions.updateProductSuccess,
          ProductsActions.deleteProductSuccess,
          ProductsActions.updateCostSuccess,
          ProductsActions.updatePriceSuccess,
        ),
        tap(() => Utilities.displayToast('success'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private store: Store<ProductsFeature.ProductsPartialState>
  ) {}
}

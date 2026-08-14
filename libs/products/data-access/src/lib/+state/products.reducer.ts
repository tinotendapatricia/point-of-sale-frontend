import { ClrLoadingState } from '@clr/angular';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ProductsActions from './products.actions';
import { ProductsEntity } from './products.models';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface ProductsState extends EntityState<ProductsEntity> {
  selectedId?: string | number;
  loaded?: boolean;
  loading: boolean;
  error?: Error;
  selectedProduct: ProductsEntity | undefined;
  total: number;
  btnState: ClrLoadingState;
  currentPage: number;
}

export interface ProductsPartialState {
  readonly [PRODUCTS_FEATURE_KEY]: ProductsState;
}

export const productsAdapter: EntityAdapter<ProductsEntity> =
  createEntityAdapter<ProductsEntity>();

export const initialProductsState: ProductsState =
  productsAdapter.getInitialState({
    loaded: false,
    loading: false,
    error: undefined,
    selectedProduct: undefined,
    total: 0,
    btnState: ClrLoadingState.DEFAULT,
    currentPage: 0,
  });

const reducer = createReducer(
  initialProductsState,
  on(
    ProductsActions.getProductById,
    ProductsActions.getPaginatedProducts,
    ProductsActions.getAllProducts,
    (state) => ({
      ...state,
      loading: true,
    })
  ),

  on(ProductsActions.getProductByIdSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    loaded: true,
    selectedProduct: product,
  })),

  on(ProductsActions.getAllProductsSuccess, (state, { products }) =>
    productsAdapter.setAll(products, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),

  on(
    ProductsActions.getPaginatedProductsSuccess,
    (state, { products, total, page }) =>
      productsAdapter.setAll(products, {
        ...state,
        loading: false,
        loaded: true,
        total: total,
        currentPage: page,
      })
  ),

  on(
    ProductsActions.getAllProductsFailure,
    ProductsActions.getProductByIdFailure,
    ProductsActions.getPaginatedProductsFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error,
    })
  ),

  on(
    ProductsActions.createProduct,
    ProductsActions.updateProduct,
    ProductsActions.deleteProduct,
    ProductsActions.updateCost,
    ProductsActions.updatePrice,
    (state) => ({
      ...state,
      btnState: ClrLoadingState.LOADING,
      loaded: false,
      error: undefined,
    })
  ),

  on(
    ProductsActions.createProductSuccess,
    ProductsActions.updateProductSuccess,
    ProductsActions.deleteProductSuccess,
    ProductsActions.updateCostSuccess,
    ProductsActions.updatePriceSuccess,
    (state) => ({
      ...state,
      loaded: true,
      btnState: ClrLoadingState.SUCCESS,
    })
  ),

  on(
    ProductsActions.createProductFailure,
    ProductsActions.updateProductFailure,
    ProductsActions.deleteProductFailure,
    ProductsActions.updateCostFailure,
    ProductsActions.updatePriceFailure,
    (state, { error }) => ({
      ...state,
      error: error,
      btnState: ClrLoadingState.ERROR,
    })
  )
);

export function productsReducer(
  state: ProductsState | undefined,
  action: Action
) {
  return reducer(state, action);
}

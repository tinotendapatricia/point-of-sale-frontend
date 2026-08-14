import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PRODUCTS_FEATURE_KEY,
  ProductsState,
  productsAdapter,
} from './products.reducer';

// Lookup the 'Products' feature state managed by NgRx
export const selectProductsState =
  createFeatureSelector<ProductsState>(PRODUCTS_FEATURE_KEY);

const { selectAll, selectEntities } = productsAdapter.getSelectors();

export const selectProductsLoaded = createSelector(
  selectProductsState,
  (state: ProductsState) => state.loaded
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductsState) => state.error
);

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => selectAll(state)
);

export const selectProductsEntities = createSelector(
  selectProductsState,
  (state: ProductsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectProductsState,
  (state: ProductsState) => state.selectedId
);
export const getSelected = (productId: string | number) =>
  createSelector(selectProductsEntities, (entities) => entities[productId]);

export const getSelectedProduct = createSelector(
  selectProductsState,
  (state: ProductsState) => state.selectedProduct
);

export const getTotalProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => state.total
);

export const getProductsLoadingState = createSelector(
  selectProductsState,
  (state: ProductsState) => state.loading
);

export const getBtnState = createSelector(
  selectProductsState,
  (state: ProductsState) => state.btnState
);
export const getCurrentPageState = createSelector(
  selectProductsState,
  (state: ProductsState) => state.currentPage
);

import { createAction, props } from '@ngrx/store';
import { ProductsEntity } from './products.models';
import { ClrDatagridStateInterface } from '@clr/angular';

export const getPaginatedProducts = createAction(
  '[Products] Get Paginated Products',
  props<{ state: ClrDatagridStateInterface }>()
);

export const getPaginatedProductsSuccess = createAction(
  '[Products] Get Paginated Products Success',
  props<{ products: ProductsEntity[]; total: number; page: number }>()
);

export const getPaginatedProductsFailure = createAction(
  '[Products] Get Paginated Products Failure',
  props<{ error: Error }>()
);

export const getAllProducts = createAction('[Products] Get All Products');

export const getAllProductsSuccess = createAction(
  '[Products] Get All Products Success',
  props<{ products: ProductsEntity[] }>()
);

export const getAllProductsFailure = createAction(
  '[Products] Get All Products Failure',
  props<{ error: Error }>()
);

export const getProductById = createAction(
  '[Products] Get Product',
  props<{ productId: string | number }>()
);

export const getProductByIdSuccess = createAction(
  '[Products] Get Product Success',
  props<{ product: ProductsEntity }>()
);

export const getProductByIdFailure = createAction(
  '[Products] Get Product Failure',
  props<{ error: any }>()
);

export const createProduct = createAction(
  '[Products] Create Product',
  (productDetails: ProductsEntity) => ({ productDetails })
);

export const createProductSuccess = createAction(
  '[Products] Create Product Success',
  (productDetails: ProductsEntity) => ({ productDetails })
);

export const createProductFailure = createAction(
  '[Products] Create Product Failure',
  props<{ error: Error }>()
);

export const deleteProduct = createAction(
  '[Products] Delete Product',
  props<{ productId: string | number }>()
);

export const deleteProductSuccess = createAction(
  '[Products] Delete Product Success'
);

export const deleteProductFailure = createAction(
  '[Products] Delete Product Failure',
  props<{ error: Error }>()
);

export const updateProduct = createAction(
  '[Products] Update Product',
  (productDetails: ProductsEntity) => ({ productDetails })
);

export const updateProductSuccess = createAction(
  '[Products] Update Product Success',
  (productDetails: ProductsEntity) => ({ productDetails })
);

export const updateProductFailure = createAction(
  '[Products] Update Product Failure',
  props<{ error: Error }>()
);

export const updateCost = createAction(
  '[Products] Update Product Cost',
  (productDetails: any) => ({ productDetails })
);

export const updateCostSuccess = createAction(
  '[Products] Update Product Cost Success',
  (productDetails: ProductsEntity) => ({ productDetails })
);

export const updateCostFailure = createAction(
  '[Products] Update Product CostFailure',
  props<{ error: Error }>()
);

export const updatePrice = createAction(
  '[Products] Update Product Price',
  (productDetails: any) => ({ productDetails })
);

export const updatePriceSuccess = createAction(
  '[Products] Update Product Price Success',
  (productDetails: ProductsEntity) => ({ productDetails })
);

export const updatePriceFailure = createAction(
  '[Products] Update Product Price Failure',
  props<{ error: Error }>()
);
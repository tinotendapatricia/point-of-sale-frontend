import { Injectable, inject } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { select, Store, Action } from '@ngrx/store';

import * as ProductsActions from './products.actions';
import { ProductsEntity } from './products.models';
import * as ProductsFeature from './products.reducer';
import * as ProductsSelectors from './products.selectors';

@Injectable()
export class ProductsFacade {
  loaded$ = this.store.pipe(select(ProductsSelectors.selectProductsLoaded));
  allProducts$ = this.store.pipe(select(ProductsSelectors.selectAllProducts));
  selectedProduct$ = this.store.pipe(
    select(ProductsSelectors.getSelectedProduct)
  );
  loading$ = this.store.pipe(select(ProductsSelectors.getProductsLoadingState));
  totalProducts$ = this.store.pipe(select(ProductsSelectors.getTotalProducts));
  btnState$ = this.store.pipe(select(ProductsSelectors.getBtnState));

  constructor(private store: Store<ProductsFeature.ProductsPartialState>) {}

  getPaginatedProducts(state: ClrDatagridStateInterface) {
    this.store.dispatch(ProductsActions.getPaginatedProducts({ state }));
  }

  getAllProducts() {
    this.store.dispatch(ProductsActions.getAllProducts());
  }

  getProduct(productId: string | number) {
    this.store.dispatch(ProductsActions.getProductById({ productId }));
  }

  createNewProduct(product: ProductsEntity) {
    this.store.dispatch(ProductsActions.createProduct(product));
  }

  updateProduct(product: ProductsEntity) {
    this.store.dispatch(ProductsActions.updateProduct(product));
  }
  updateCost(product: any) {
    this.store.dispatch(ProductsActions.updateCost(product));
  }

  updatePrice(product: any) {
    this.store.dispatch(ProductsActions.updatePrice(product));
  }
}

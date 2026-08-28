import { EnvironmentProviders, Provider } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromProducts from './+state/products.reducer';
import { ProductsEffects } from './+state/products.effects';
import { ProductsFacade } from './+state/products.facade';

export function provideProductsDataAccess(): (Provider | EnvironmentProviders)[] {
  return [
    provideState(fromProducts.PRODUCTS_FEATURE_KEY, fromProducts.productsReducer),
    provideEffects(ProductsEffects),
    ProductsFacade,
  ];
}

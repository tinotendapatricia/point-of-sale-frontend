import * as ProductsActions from './lib/+state/products.actions';

import * as ProductsFeature from './lib/+state/products.reducer';

import * as ProductsSelectors from './lib/+state/products.selectors';

export * from './lib/+state/products.facade';

export * from './lib/+state/products.models';

export { ProductsActions, ProductsFeature, ProductsSelectors };
export * from './lib/products-data-access.module';
export * from './lib/services/products.service'

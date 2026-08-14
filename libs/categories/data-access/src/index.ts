

import * as CategoriesActions from './lib/+state/categories.actions';

import * as CategoriesFeature from './lib/+state/categories.reducer';

import * as CategoriesSelectors from './lib/+state/categories.selectors';

export * from './lib/+state/categories.facade';

export * from './lib/+state/categories.models';

export { CategoriesActions, CategoriesFeature, CategoriesSelectors };

export * from './lib/categories-data-access.module';

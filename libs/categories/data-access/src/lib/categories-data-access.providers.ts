import { EnvironmentProviders, Provider } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromCategories from './+state/categories.reducer';
import { CategoriesEffects } from './+state/categories.effects';
import { CategoriesFacade } from './+state/categories.facade';

export function provideCategoriesDataAccess(): (Provider | EnvironmentProviders)[] {
  return [
    provideState(fromCategories.CATEGORIES_FEATURE_KEY, fromCategories.categoriesReducer),
    provideEffects(CategoriesEffects),
    CategoriesFacade,
  ];
}

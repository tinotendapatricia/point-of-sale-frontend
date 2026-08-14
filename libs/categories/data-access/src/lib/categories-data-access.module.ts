import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCategories from './+state/categories.reducer';
import { CategoriesEffects } from './+state/categories.effects';
import { CategoriesFacade } from './+state/categories.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCategories.CATEGORIES_FEATURE_KEY,
      fromCategories.categoriesReducer
    ),
    EffectsModule.forFeature([CategoriesEffects]),
   
  ],
  providers: [CategoriesFacade],
})
export class CategoriesDataAccessModule {}

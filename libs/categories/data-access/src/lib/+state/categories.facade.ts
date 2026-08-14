import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as CategoriesActions from './categories.actions';
import * as CategoriesFeature from './categories.reducer';
import * as CategoriesSelectors from './categories.selectors';
import { CategoriesEntity } from './categories.models';
import { ClrDatagridStateInterface } from '@clr/angular';

@Injectable()
export class CategoriesFacade {
  loaded$ = this.store.pipe(select(CategoriesSelectors.selectCategoriesLoaded));
  allCategories$ = this.store.pipe(select(CategoriesSelectors.selectAllCategories));
  selectedCategorie$ = this.store.pipe(select(CategoriesSelectors.getSelectedCategorie));
  loading$ = this.store.pipe(select(CategoriesSelectors.getCategoriesLoadingState));
  totalCategories$ = this.store.pipe(select(CategoriesSelectors.getTotalCategories));
  btnState$ = this.store.pipe(select(CategoriesSelectors.getBtnState));

  constructor(private store: Store<CategoriesFeature.CategoriesPartialState>) {}

  getPaginatedCategories(state: ClrDatagridStateInterface) {
    this.store.dispatch(CategoriesActions.getPaginatedCategories({ state }));
  }

  getAllCategories() {
    this.store.dispatch(CategoriesActions.getAllCategories());
  }

  getCategorie(categorieId: string | number) {
    this.store.dispatch(CategoriesActions.getCategorieById({ categorieId }));
  }

  createNewCategorie(categorie: CategoriesEntity) {
    this.store.dispatch(CategoriesActions.createCategorie(categorie));
  }

  updateCategorie(categorie: CategoriesEntity) {
    this.store.dispatch(CategoriesActions.updateCategorie(categorie));
  }

  assignCategorieRoles(categorieDetails: any) {
    this.store.dispatch(CategoriesActions.assignCategorieRoles(categorieDetails));
  }
}

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatagridState } from '@pos-frontend/shared/utils';
import { CategoriesEntity, CategoriesFacade } from '@pos-frontend/categories/data-access';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CategoryListUiComponent } from '@pos-frontend/categories/ui';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, MatIconModule, CategoryListUiComponent, AsyncPipe]
})
export class CategoriesListComponent {
  private readonly dialog = inject(MatDialog);

  constructor(
    public categoriesFacade: CategoriesFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public getCategorieList(state: DatagridState) {
    this.categoriesFacade.getPaginatedCategories(state);
  }

  refresh() {
    this.getCategorieList({});
  }

  createCategorie() {
    this.dialog
      .open(CreateCategoryComponent, { width: '480px' })
      .afterClosed()
      .subscribe((created) => created && this.refresh());
  }

  updateCategorie(categorie: CategoriesEntity) {
    this.router.navigate(['./update-categorie', categorie.id], {
      relativeTo: this.route,
    });
  }

  viewCategorie(categorie: CategoriesEntity) {
    this.categoriesFacade.getCategorie(categorie.id);
    this.router.navigate(['./categorie-details', categorie.id], {
      relativeTo: this.route,
    });
  }

  viewCategorieAuthorities(categorieId: any) {
    this.router.navigate(['./view-categorie', categorieId], {
      relativeTo: this.route,
    });
  }
}

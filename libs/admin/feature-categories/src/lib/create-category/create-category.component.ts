import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesFacade } from '@pos-frontend/categories/data-access';
import { CategoryFormComponent } from '../../../../../categories/ui/src/lib/category-form/category-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CategoryFormComponent, AsyncPipe]
})
export class CreateCategoryComponent {
  @Output() closeModal = new EventEmitter();
  constructor(
    public categoriesService: CategoriesFacade,
    private router: Router // public categoriesFacade: CategoriesFacade
  ) {}

  ngOnInit(): void {
    // this.categoriesFacade.getAllCategories();
  }

  public createCategorie(categorie: any) {
    this.categoriesService.createNewCategorie(categorie);
    this.categoriesService.loaded$.subscribe((res) => {
      res ? this.closeModal.emit(): null;
    });
  }
}

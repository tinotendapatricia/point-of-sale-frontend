import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoriesFacade } from '@pos-frontend/categories/data-access';
import { CategoryFormComponent } from '@pos-frontend/categories/ui';

@Component({
    selector: 'pos-frontend-create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CategoryFormComponent]
})
export class CreateCategoryComponent {
  private readonly dialogRef = inject(MatDialogRef<CreateCategoryComponent, boolean>);
  readonly categoriesService = inject(CategoriesFacade);

  readonly submitting = signal(false);

  public createCategorie(categorie: any) {
    this.submitting.set(true);
    this.categoriesService.createNewCategorie(categorie);
    this.categoriesService.loaded$.pipe(take(1)).subscribe((loaded) => {
      this.submitting.set(false);
      if (loaded) {
        this.dialogRef.close(true);
      }
    });
  }
}

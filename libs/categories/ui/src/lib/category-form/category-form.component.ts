import { Component, ChangeDetectionStrategy, inject, input, output, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CategoriesEntity } from '@pos-frontend/categories/data-access';

@Component({
    selector: 'pos-frontend-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule]
})
export class CategoryFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<unknown>, { optional: true });

  readonly categorie = input<CategoriesEntity>();
  readonly loading = input(false);
  readonly title = input('');
  readonly btnTitle = input('Submit');
  readonly formValue = output<any>();

  readonly categorieForm = this.formBuilder.group({
    name: [''],
    code: [''],
    id: [''],
  });

  constructor() {
    effect(() => {
      const categorie = this.categorie();
      if (categorie) {
        this.categorieForm.patchValue(categorie);
      }
    });
  }

  cancel() {
    this.dialogRef?.close(false);
  }

  submit() {
    this.formValue.emit(this.categorieForm.value);
  }
}

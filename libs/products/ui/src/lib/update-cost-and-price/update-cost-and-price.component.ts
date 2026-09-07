import { Component, ChangeDetectionStrategy, inject, input, output, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductsEntity } from '@pos-frontend/products/data-access';

@Component({
    selector: 'pos-frontend-update-cost-and-price',
    templateUrl: './update-cost-and-price.component.html',
    styleUrls: ['./update-cost-and-price.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule]
})
export class UpdateCostAndPriceComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<unknown>, { optional: true });

  readonly product = input<ProductsEntity>();
  readonly loading = input(false);
  readonly title = input('');
  readonly btnTitle = input('Submit');
  readonly isCost = input(false);
  readonly isPrice = input(false);
  readonly formValue = output<any>();

  readonly form = this.formBuilder.group({
    id: [''],
    price: [''],
    cost: [''],
    currency: [{ disabled: true, value: '' }],
    effectiveDate: [''],
  });

  constructor() {
    effect(() => {
      const product = this.product();
      if (product) {
        this.form.get('id')?.patchValue(String(product.id));
      }
    });
  }

  cancel() {
    this.dialogRef?.close(false);
  }

  submit() {
    this.formValue.emit(this.form.value);
  }
}

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import {
  type ProductsEntity,
  ProductStore,
} from '@pos-frontend/products/data-access';
import { DialogHeaderComponent } from '@pos-frontend/shared/ui';

export interface CreateProductData {
  /** Present when editing an existing product; omit to create a new one. */
  product?: ProductsEntity;
}

/** Create/update dialog: opened through MatDialog from the products pages. */
@Component({
  selector: 'pos-frontend-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    DialogHeaderComponent,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatProgressSpinnerModule,
  ],
})
export class CreateProductComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef =
    inject<MatDialogRef<CreateProductComponent, boolean>>(MatDialogRef);
  private readonly data = inject<CreateProductData | null>(MAT_DIALOG_DATA, {
    optional: true,
  });
  private readonly productStore = inject(ProductStore);

  protected readonly product = this.data?.product;
  protected readonly title = this.product ? 'Update Product' : 'New Product';
  protected readonly submitLabel = this.product ? 'Update' : 'Create';
  protected readonly loading = computed(() =>
    this.product
      ? this.productStore.updateLoading()
      : this.productStore.createLoading()
  );

  protected readonly form = this.fb.group({
    name: [this.product?.name ?? '', Validators.required],
    code: [this.product?.code ?? '', Validators.required],
    barcode: [this.product?.barcode ?? '', Validators.required],
    active: [this.product?.active ?? false, Validators.required],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const callback = () => this.dialogRef.close(true);

    if (this.product) {
      this.productStore.updateProduct({
        data: { ...this.product, ...value },
        callback,
      });
    } else {
      this.productStore.createProduct({ data: value, callback });
    }
  }
}

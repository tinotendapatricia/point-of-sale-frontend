import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import {
  type ProductsEntity,
  ProductStore,
} from '@pos-frontend/products/data-access';
import { DialogHeaderComponent } from '@pos-frontend/shared/ui';

export interface UpdateCostData {
  product: ProductsEntity;
}

/** Cost dialog: opened through MatDialog from the products list. */
@Component({
  selector: 'pos-frontend-update-cost',
  templateUrl: './update-cost.component.html',
  styleUrl: './update-cost.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    DialogHeaderComponent,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
})
export class UpdateCostComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef =
    inject<MatDialogRef<UpdateCostComponent, boolean>>(MatDialogRef);
  private readonly data = inject<UpdateCostData>(MAT_DIALOG_DATA);
  private readonly productStore = inject(ProductStore);

  protected readonly product = this.data.product;
  protected readonly loading = this.productStore.updateLoading;

  // The list shows cost[0] as the current unit cost, so start from that.
  protected readonly form = this.fb.group({
    cost: [this.product.cost?.[0]?.value ?? 0, [Validators.required, Validators.min(0)]],
    effectiveDate: [''],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.productStore.updateCost({
      data: { ...this.form.getRawValue(), id: this.product.id },
      callback: () => this.dialogRef.close(true),
    });
  }
}

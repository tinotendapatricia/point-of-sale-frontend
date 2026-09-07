import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsEntity, ProductStore } from '@pos-frontend/products/data-access';
import { UpdateCostAndPriceComponent } from '@pos-frontend/products/ui';

export interface UpdateCostData {
  product: ProductsEntity;
}

@Component({
    selector: 'pos-frontend-update-cost',
    templateUrl: './update-cost.component.html',
    styleUrls: ['./update-cost.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [UpdateCostAndPriceComponent]
})
export class UpdateCostComponent {
  private readonly dialogRef = inject(MatDialogRef<UpdateCostComponent, boolean>);
  private readonly data = inject<UpdateCostData>(MAT_DIALOG_DATA);
  protected readonly productsStore = inject(ProductStore);

  readonly product = this.data.product;
  protected readonly submitting = this.productsStore.updateLoading;

  public onSubmit(cost: ProductsEntity) {
    this.productsStore.updateCost({
      data: cost,
      callback: () => this.dialogRef.close(true),
    });
  }
}

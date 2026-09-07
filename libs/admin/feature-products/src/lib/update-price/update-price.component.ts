import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsEntity, ProductStore } from '@pos-frontend/products/data-access';
import { UpdateCostAndPriceComponent } from '@pos-frontend/products/ui';

export interface UpdatePriceData {
  product: ProductsEntity;
}

@Component({
    selector: 'pos-frontend-update-price',
    templateUrl: './update-price.component.html',
    styleUrls: ['./update-price.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [UpdateCostAndPriceComponent]
})
export class UpdatePriceComponent {
  private readonly dialogRef = inject(MatDialogRef<UpdatePriceComponent, boolean>);
  private readonly data = inject<UpdatePriceData>(MAT_DIALOG_DATA);
  protected readonly productsStore = inject(ProductStore);

  readonly product = this.data.product;
  protected readonly submitting = this.productsStore.updateLoading;

  public onSubmit(price: ProductsEntity) {
    this.productsStore.updatePrice({
      data: price,
      callback: () => this.dialogRef.close(true),
    });
  }
}

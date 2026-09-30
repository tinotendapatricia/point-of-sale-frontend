import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { injectDrawerData, injectDrawerRef } from '@pos-frontend/core';
import {
  type ProductsEntity,
  ProductStore,
} from '@pos-frontend/products/data-access';
import {
  type CostPriceFormValue,
  UpdateCostAndPriceComponent,
} from '@pos-frontend/products/ui';

export interface UpdatePriceData {
  product: ProductsEntity;
}

/** Drawer content: opened from the products list with the row as data. */
@Component({
  selector: 'pos-frontend-update-price',
  templateUrl: './update-price.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UpdateCostAndPriceComponent],
})
export class UpdatePriceComponent {
  private readonly drawerRef = injectDrawerRef<boolean>();
  private readonly data = injectDrawerData<UpdatePriceData>();
  private readonly productStore = inject(ProductStore);

  protected readonly submitting = this.productStore.updateLoading;

  protected update(value: CostPriceFormValue): void {
    this.productStore.updatePrice({
      data: {
        id: this.data.product.id,
        price: value.amount,
        effectiveDate: value.effectiveDate,
      },
      callback: () => this.drawerRef.close(true),
    });
  }

  protected cancel(): void {
    this.drawerRef.close(false);
  }
}

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

export interface UpdateCostData {
  product: ProductsEntity;
}

/** Drawer content: opened from the products list with the row as data. */
@Component({
  selector: 'pos-frontend-update-cost',
  templateUrl: './update-cost.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UpdateCostAndPriceComponent],
})
export class UpdateCostComponent {
  private readonly drawerRef = injectDrawerRef<boolean>();
  private readonly data = injectDrawerData<UpdateCostData>();
  private readonly productStore = inject(ProductStore);

  protected readonly submitting = this.productStore.updateLoading;

  protected update(value: CostPriceFormValue): void {
    this.productStore.updateCost({
      data: {
        id: this.data.product.id,
        cost: value.amount,
        effectiveDate: value.effectiveDate,
      },
      callback: () => this.drawerRef.close(true),
    });
  }

  protected cancel(): void {
    this.drawerRef.close(false);
  }
}

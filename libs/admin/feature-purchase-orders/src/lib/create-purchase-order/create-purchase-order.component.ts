import { ChangeDetectionStrategy, Component, computed, inject, viewChild } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { CreditorStore } from '@pos-frontend/creditors/data-access';
import { ProductStore } from '@pos-frontend/products/data-access';
import {
  type CreatePurchaseOrderRequest,
  PurchaseOrderStore,
} from '@pos-frontend/purchase-orders/data-access';
import { PurchaseOrderFormComponent } from '@pos-frontend/purchase-orders/ui';

@Component({
  selector: 'pos-frontend-create-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCard, MatCardContent, PurchaseOrderFormComponent],
})
export class CreatePurchaseOrderComponent {
  private readonly productStore = inject(ProductStore);
  private readonly creditorStore = inject(CreditorStore);
  private readonly purchaseOrderStore = inject(PurchaseOrderStore);

  private readonly orderForm = viewChild(PurchaseOrderFormComponent);

  protected readonly products = this.productStore.products;
  protected readonly creditors = this.creditorStore.creditors;
  protected readonly submitting = this.purchaseOrderStore.createLoading;
  protected readonly purchaseOrderNumber = computed(
    () => this.purchaseOrderStore.purchaseOrder()?.orderNumber
  );

  constructor() {
    this.productStore.getAllProducts();
    this.creditorStore.getAllCreditors();
  }

  protected create(order: CreatePurchaseOrderRequest): void {
    this.purchaseOrderStore.createPurchaseOrder({
      data: order,
      callback: () => this.orderForm()?.reset(),
    });
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { GrvFormComponent } from '@pos-frontend/goods-received/ui';
import {
  PurchaseOrderStore,
  type ReceivePurchaseOrderRequest,
} from '@pos-frontend/purchase-orders/data-access';

@Component({
  selector: 'pos-frontend-create-grv',
  templateUrl: './create-grv.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCard, MatCardContent, GrvFormComponent],
})
export class CreateGrvComponent {
  private readonly purchaseOrderStore = inject(PurchaseOrderStore);

  protected readonly lines = this.purchaseOrderStore.purchaseOrderLines;
  protected readonly loadingOrder = this.purchaseOrderStore.getOneLoading;
  protected readonly submitting = this.purchaseOrderStore.receiveLoading;

  protected getPurchaseOrder(orderNumber: number): void {
    this.purchaseOrderStore.getPurchaseOrder({ id: orderNumber });
  }

  protected receive(request: ReceivePurchaseOrderRequest): void {
    // The store clears `purchaseOrderLines` on success, which resets the form's table.
    this.purchaseOrderStore.receivePurchaseOrder({ data: request, callback: () => undefined });
  }
}

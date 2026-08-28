import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductsFacade } from '@pos-frontend/products/data-access';
import { PurchaseOrderFacade } from '@pos-frontend/purchase-orders/data-access';
import { MatCard, MatCardContent } from '@angular/material/card';
import { GrvFormComponent } from '../../../../../goods-received/ui/src/lib/grv-form/grv-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-create-grv',
    templateUrl: './create-grv.component.html',
    styleUrls: ['./create-grv.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, GrvFormComponent, AsyncPipe]
})
export class CreateGrvComponent implements OnInit {
  constructor(public purchaseOrderFacade: PurchaseOrderFacade,
     public productsFacade:ProductsFacade) {}

  ngOnInit(): void {
    //this.productsFacade.getAllProducts()
  }

  getPurchaseOrder(orderNumber: string) {

    this.purchaseOrderFacade.getPurchaseOrder(orderNumber);
  }

  onSubmit(receiveOrder: any) {
   this.purchaseOrderFacade.updatePurchaseOrder(receiveOrder)
  }
}

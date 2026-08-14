import { Component, OnInit } from '@angular/core';
import { ProductsFacade } from '@pos-frontend/products/data-access';
import { PurchaseOrderFacade } from '@pos-frontend/purchase-orders/data-access';

@Component({
  selector: 'pos-frontend-create-grv',
  templateUrl: './create-grv.component.html',
  styleUrls: ['./create-grv.component.scss'],
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

import { Component, OnInit } from '@angular/core';
import { CreditorsFacade } from '@pos-frontend/creditors/data-access';
import { ProductsFacade } from '@pos-frontend/products/data-access';
import { PurchaseOrderFacade } from '@pos-frontend/purchase-orders/data-access';
import { VatFacade } from '@pos-frontend/vat/data-access';

@Component({
    selector: 'pos-frontend-create-purchase-order',
    templateUrl: './create-purchase-order.component.html',
    styleUrls: ['./create-purchase-order.component.scss'],
    standalone: false
})
export class CreatePurchaseOrderComponent implements OnInit {
  constructor(
    public productsFacade: ProductsFacade,
    public vatFacade: VatFacade,
    public creditorsFacade: CreditorsFacade,
    public purchaseOrderFacade: PurchaseOrderFacade
  ) {}

  ngOnInit(): void {
    this.productsFacade.getAllProducts();
    //this.vatFacade.getVat();
    this.creditorsFacade.getAllCreditors();
  }

  onSubmit(purchaseOrderDetails: any) {

    this.purchaseOrderFacade.createNewPurchaseOrder(purchaseOrderDetails);
    //this.purchaseOrderFacade.loaded$.subscribe((res) => {});
  }
}

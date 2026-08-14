import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPurchaseOrder from './+state/purchase-order.reducer';
import { PurchaseOrderEffects } from './+state/purchase-order.effects';
import { PurchaseOrderFacade } from './+state/purchase-order.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromPurchaseOrder.PURCHASE_ORDER_FEATURE_KEY,
      fromPurchaseOrder.purchaseOrderReducer
    ),
    EffectsModule.forFeature([PurchaseOrderEffects]),
  ],
  providers: [PurchaseOrderFacade],
})
export class PurchaseOrdersDataAccessModule {}

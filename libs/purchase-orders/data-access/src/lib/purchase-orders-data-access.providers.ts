import { EnvironmentProviders, Provider } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromPurchaseOrder from './+state/purchase-order.reducer';
import { PurchaseOrderEffects } from './+state/purchase-order.effects';
import { PurchaseOrderFacade } from './+state/purchase-order.facade';

export function providePurchaseOrdersDataAccess(): (Provider | EnvironmentProviders)[] {
  return [
    provideState(fromPurchaseOrder.PURCHASE_ORDER_FEATURE_KEY, fromPurchaseOrder.purchaseOrderReducer),
    provideEffects(PurchaseOrderEffects),
    PurchaseOrderFacade,
  ];
}

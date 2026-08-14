import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as PurchaseOrderActions from './purchase-order.actions';
import * as PurchaseOrderFeature from './purchase-order.reducer';
import * as PurchaseOrderSelectors from './purchase-order.selectors';
import { ClrDatagridStateInterface } from '@clr/angular';
import { PurchaseOrderEntity } from './purchase-order.models';

@Injectable()
export class PurchaseOrderFacade {
  loaded$ = this.store.pipe(
    select(PurchaseOrderSelectors.selectPurchaseOrderLoaded)
  );
  allPurchaseOrder$ = this.store.pipe(
    select(PurchaseOrderSelectors.selectAllPurchaseOrder)
  );
  selectedPurchaseOrder$ = this.store.pipe(
    select(PurchaseOrderSelectors.getSelectedPurchaseOrder)
  );
  loading$ = this.store.pipe(
    select(PurchaseOrderSelectors.getPurchaseOrderLoadingState)
  );
  totalPurchaseOrder$ = this.store.pipe(
    select(PurchaseOrderSelectors.getTotalPurchaseOrder)
  );
  btnState$ = this.store.pipe(select(PurchaseOrderSelectors.getBtnState));

  constructor(
    private store: Store<PurchaseOrderFeature.PurchaseOrderPartialState>
  ) {}

  getPaginatedPurchaseOrder(state: ClrDatagridStateInterface) {
    this.store.dispatch(
      PurchaseOrderActions.getPaginatedPurchaseOrder({ state })
    );
  }

  getAllPurchaseOrder() {
    this.store.dispatch(PurchaseOrderActions.getAllPurchaseOrder());
  }

  getPurchaseOrder(purchaseOrderId: string | number) {
    this.store.dispatch(
      PurchaseOrderActions.getPurchaseOrderById({ purchaseOrderId })
    );
  }

  createNewPurchaseOrder(purchaseOrder: PurchaseOrderEntity) {
    this.store.dispatch(
      PurchaseOrderActions.createPurchaseOrder(purchaseOrder)
    );
  }

  updatePurchaseOrder(purchaseOrder: PurchaseOrderEntity) {
    this.store.dispatch(
      PurchaseOrderActions.updatePurchaseOrder(purchaseOrder)
    );
  }

  assignPurchaseOrderRoles(purchaseOrderDetails: any) {
    this.store.dispatch(
      PurchaseOrderActions.assignPurchaseOrderRoles(purchaseOrderDetails)
    );
  }
}

import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PURCHASE_ORDER_FEATURE_KEY,
  PurchaseOrderState,
  purchaseOrderAdapter,
} from './purchase-order.reducer';

// Lookup the 'PurchaseOrder' feature state managed by NgRx
export const selectPurchaseOrderState =
  createFeatureSelector<PurchaseOrderState>(PURCHASE_ORDER_FEATURE_KEY);

const { selectAll, selectEntities } = purchaseOrderAdapter.getSelectors();

export const selectPurchaseOrderLoaded = createSelector(
  selectPurchaseOrderState,
  (state: PurchaseOrderState) => state.loaded
);

export const selectPurchaseOrderError = createSelector(
  selectPurchaseOrderState,
  (state: PurchaseOrderState) => state.error
);

export const selectAllPurchaseOrder = createSelector(
  selectPurchaseOrderState,
  (state: PurchaseOrderState) => selectAll(state)
);

export const selectPurchaseOrderEntities = createSelector(
  selectPurchaseOrderState,
  (state: PurchaseOrderState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectPurchaseOrderState,
  (state: PurchaseOrderState) => state.selectedId
);

export const selectEntity = createSelector(
  selectPurchaseOrderEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const getSelected = (creditorId: string | number) =>
  createSelector(
    selectPurchaseOrderEntities,
    (entities) => entities[creditorId]
  );

export const getSelectedPurchaseOrder = createSelector(
  selectPurchaseOrderState,
  (state: PurchaseOrderState) => state.selectedPurchaseOrder
);

export const getTotalPurchaseOrder = createSelector(
  selectPurchaseOrderState,
  (state: PurchaseOrderState) => state.total
);

export const getCurrentPageState = createSelector(
  selectPurchaseOrderState,
  (state: PurchaseOrderState) => state.currentPage
);

export const getPurchaseOrderLoadingState = createSelector(
  selectPurchaseOrderState,
  (state: PurchaseOrderState) => state.loading
);

export const getBtnState = createSelector(
  selectPurchaseOrderState,
  (state: PurchaseOrderState) => state.btnState
);

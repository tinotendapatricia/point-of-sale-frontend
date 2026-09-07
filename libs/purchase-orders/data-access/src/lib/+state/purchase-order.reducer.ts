import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as PurchaseOrderActions from './purchase-order.actions';
import { PurchaseOrderEntity } from './purchase-order.models';
import { LoadingState } from '@pos-frontend/shared/utils';

export const PURCHASE_ORDER_FEATURE_KEY = 'purchaseOrder';

export interface PurchaseOrderState extends EntityState<PurchaseOrderEntity> {
  selectedId?: string | number;
  loaded?: boolean;
  loading: boolean;
  error?: Error;
  selectedPurchaseOrder: PurchaseOrderEntity | undefined;
  total: number;
  btnState: LoadingState;
  currentPage: number;
}

export interface PurchaseOrderPartialState {
  readonly [PURCHASE_ORDER_FEATURE_KEY]: PurchaseOrderState;
}

export const purchaseOrderAdapter: EntityAdapter<PurchaseOrderEntity> =
  createEntityAdapter<PurchaseOrderEntity>();

export const initialPurchaseOrderState: PurchaseOrderState =
  purchaseOrderAdapter.getInitialState({
    loaded: false,
    loading: false,
    error: undefined,
    selectedPurchaseOrder: undefined,
    total: 0,
    btnState: LoadingState.DEFAULT,
    currentPage: 0,
  });

const reducer = createReducer(
  initialPurchaseOrderState,
  on(
    PurchaseOrderActions.getPurchaseOrderById,
    PurchaseOrderActions.getPaginatedPurchaseOrder,
    PurchaseOrderActions.getAllPurchaseOrder,
    (state) => ({
      ...state,
      loading: true,
    })
  ),

  on(
    PurchaseOrderActions.getPurchaseOrderByIdSuccess,
    (state, { purchaseOrder }) => ({
      ...state,
      loading: false,
      loaded: true,
      selectedPurchaseOrder: purchaseOrder,
    })
  ),

  on(
    PurchaseOrderActions.getAllPurchaseOrderSuccess,
    (state, { purchaseOrders }) =>
      purchaseOrderAdapter.setAll(purchaseOrders, {
        ...state,
        loading: false,
        loaded: true,
      })
  ),

  on(
    PurchaseOrderActions.getPaginatedPurchaseOrderSuccess,
    (state, { purchaseOrders, total, page }) =>
      purchaseOrderAdapter.setAll(purchaseOrders, {
        ...state,
        loading: false,
        loaded: true,
        total: total,
        currentPage: page,
      })
  ),

  on(
    PurchaseOrderActions.getAllPurchaseOrderFailure,
    PurchaseOrderActions.getPurchaseOrderByIdFailure,
    PurchaseOrderActions.getPaginatedPurchaseOrderFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error,
    })
  ),

  on(
    PurchaseOrderActions.createPurchaseOrder,
    PurchaseOrderActions.updatePurchaseOrder,
    PurchaseOrderActions.deletePurchaseOrder,
    PurchaseOrderActions.assignPurchaseOrderRoles,
    (state) => ({
      ...state,
      btnState: LoadingState.LOADING,
      loaded: false,
      error: undefined,
    })
  ),

  on(
    PurchaseOrderActions.createPurchaseOrderSuccess,
    // PurchaseOrderActions.updatePurchaseOrderSuccess,
    //PurchaseOrderActions.deletePurchaseOrderSuccess,
    //PurchaseOrderActions.assignPurchaseOrderRolesSuccess,
    (state, { purchaseOrderDetails }) => ({
      ...state,
      loaded: true,
      btnState: LoadingState.SUCCESS,
      selectedPurchaseOrder: purchaseOrderDetails,
    })
  ),

  on(
    PurchaseOrderActions.createPurchaseOrderFailure,
    PurchaseOrderActions.updatePurchaseOrderFailure,
    PurchaseOrderActions.deletePurchaseOrderFailure,
    PurchaseOrderActions.assignPurchaseOrderRolesFailure,
    (state, { error }) => ({
      ...state,
      error: error,
      btnState: LoadingState.ERROR,
    })
  )
);

export function purchaseOrderReducer(
  state: PurchaseOrderState | undefined,
  action: Action
) {
  return reducer(state, action);
}

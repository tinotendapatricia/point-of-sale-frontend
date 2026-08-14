import { createAction, props } from '@ngrx/store';
import { PurchaseOrderEntity } from './purchase-order.models';
import { ClrDatagridStateInterface } from '@clr/angular';

export const getPaginatedPurchaseOrder = createAction(
  '[PurchaseOrder] Get Paginated PurchaseOrder',
  props<{ state: ClrDatagridStateInterface }>()
);

export const getPaginatedPurchaseOrderSuccess = createAction(
  '[PurchaseOrder] Get Paginated PurchaseOrder Success',
  props<{
    purchaseOrders: PurchaseOrderEntity[];
    total: number;
    page: number;
  }>()
);

export const getPaginatedPurchaseOrderFailure = createAction(
  '[PurchaseOrder] Get Paginated PurchaseOrder Failure',
  props<{ error: Error }>()
);

export const getAllPurchaseOrder = createAction(
  '[PurchaseOrder] Get All PurchaseOrder'
);

export const getAllPurchaseOrderSuccess = createAction(
  '[PurchaseOrder] Get All PurchaseOrder Success',
  props<{ purchaseOrders: PurchaseOrderEntity[] }>()
);

export const getAllPurchaseOrderFailure = createAction(
  '[PurchaseOrder] Get All PurchaseOrder Failure',
  props<{ error: Error }>()
);

export const getPurchaseOrderById = createAction(
  '[PurchaseOrder] Get PurchaseOrder',
  props<{ purchaseOrderId: string | number }>()
);

export const getPurchaseOrderByIdSuccess = createAction(
  '[PurchaseOrder] Get PurchaseOrder Success',
  props<{ purchaseOrder: PurchaseOrderEntity }>()
);

export const getPurchaseOrderByIdFailure = createAction(
  '[PurchaseOrder] Get PurchaseOrder Failure',
  props<{ error: any }>()
);

export const createPurchaseOrder = createAction(
  '[PurchaseOrder] Create PurchaseOrder',
  (purchaseOrderDetails: PurchaseOrderEntity) => ({ purchaseOrderDetails })
);

export const createPurchaseOrderSuccess = createAction(
  '[PurchaseOrder] Create PurchaseOrder Success',
  (purchaseOrderDetails: PurchaseOrderEntity) => ({ purchaseOrderDetails })
);

export const createPurchaseOrderFailure = createAction(
  '[PurchaseOrder] Create PurchaseOrder Failure',
  props<{ error: Error }>()
);

export const deletePurchaseOrder = createAction(
  '[PurchaseOrder] Delete PurchaseOrder',
  props<{ purchaseOrderId: string | number }>()
);

export const deletePurchaseOrderSuccess = createAction(
  '[PurchaseOrder] Delete PurchaseOrder Success'
);

export const deletePurchaseOrderFailure = createAction(
  '[PurchaseOrder] Delete PurchaseOrder Failure',
  props<{ error: Error }>()
);

export const updatePurchaseOrder = createAction(
  '[PurchaseOrder] Update PurchaseOrder',
  (purchaseOrderDetails: PurchaseOrderEntity) => ({ purchaseOrderDetails })
);

export const updatePurchaseOrderSuccess = createAction(
  '[PurchaseOrder] Update PurchaseOrder Success',
  (purchaseOrderDetails: PurchaseOrderEntity) => ({ purchaseOrderDetails })
);

export const updatePurchaseOrderFailure = createAction(
  '[PurchaseOrder] Update PurchaseOrder Failure',
  props<{ error: Error }>()
);

export const assignPurchaseOrderRoles = createAction(
  '[PurchaseOrder] Assign PurchaseOrder Roles',
  (purchaseOrderDetails: PurchaseOrderEntity) => ({ purchaseOrderDetails })
);

export const assignPurchaseOrderRolesSuccess = createAction(
  '[PurchaseOrder] Assign PurchaseOrder Roles Success',
  (purchaseOrderDetails: PurchaseOrderEntity) => ({ purchaseOrderDetails })
);

export const assignPurchaseOrderRolesFailure = createAction(
  '[PurchaseOrder] Assign PurchaseOrder Roles Failure',
  props<{ error: Error }>()
);

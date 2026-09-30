import {
  setError,
  setLoaded,
  setLoading,
  withCallState,
  withDevtools,
  withReset,
} from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe, switchMap, tap } from 'rxjs';

import { type RxMethodInputWithCallback, ToastService } from '@pos-frontend/core';
import { type Page } from '@pos-frontend/shared/data-access';

import {
  type AssignPurchaseOrderRolesRequest,
  type CreatePurchaseOrderRequest,
  type PurchaseOrderEntity,
  type PurchaseOrderFilters,
  type PurchaseOrderReceivableLine,
  type ReceivePurchaseOrderRequest,
} from './purchase-order.model';
import { PurchaseOrderService } from './purchase-order.service';

interface State {
  purchaseOrder: PurchaseOrderEntity | undefined;
  purchaseOrders: PurchaseOrderEntity[];
  purchaseOrdersPage: Page<PurchaseOrderEntity> | undefined;
  /** Lines of the order loaded by `getPurchaseOrder`, for goods receiving. */
  purchaseOrderLines: PurchaseOrderReceivableLine[];
}

const initialState: State = {
  purchaseOrder: undefined,
  purchaseOrders: [],
  purchaseOrdersPage: undefined,
  purchaseOrderLines: [],
};

export const PurchaseOrderStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withDevtools('purchaseOrders'),
  withReset(),
  withCallState({
    collections: [
      'getPaginated',
      'getMany',
      'getOne',
      'create',
      'receive',
      'assignRoles',
      'delete',
    ],
  }),

  withComputed(({ purchaseOrdersPage }) => ({
    paginatedPurchaseOrders: computed(
      () => purchaseOrdersPage()?.content ?? []
    ),
    totalPurchaseOrders: computed(
      () => purchaseOrdersPage()?.totalElements ?? 0
    ),
  })),

  withMethods(
    (
      store,
      service = inject(PurchaseOrderService),
      toast = inject(ToastService)
    ) => ({
      getPaginatedPurchaseOrders: rxMethod<PurchaseOrderFilters | void>(
        pipe(
          tap(() => patchState(store, setLoading('getPaginated'))),
          switchMap(filters =>
            service.getPaginatedPurchaseOrders(filters ?? {}).pipe(
              tapResponse({
                next: purchaseOrdersPage => {
                  patchState(
                    store,
                    { purchaseOrdersPage },
                    setLoaded('getPaginated')
                  );
                },
                error: error => {
                  patchState(store, setError(error, 'getPaginated'));
                },
              })
            )
          )
        )
      ),

      createPurchaseOrder: rxMethod<
        RxMethodInputWithCallback<CreatePurchaseOrderRequest>
      >(
        pipe(
          tap(() => patchState(store, setLoading('create'))),
          exhaustMap(request =>
            service.createPurchaseOrder(request.data).pipe(
              tapResponse({
                next: purchaseOrder => {
                  patchState(store, { purchaseOrder }, setLoaded('create'));
                  toast.success('Purchase order created successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'create'));
                  toast.warning('Failed to create purchase order');
                },
              })
            )
          )
        )
      ),

      receivePurchaseOrder: rxMethod<
        RxMethodInputWithCallback<ReceivePurchaseOrderRequest>
      >(
        pipe(
          tap(() => patchState(store, setLoading('receive'))),
          exhaustMap(request =>
            service.receivePurchaseOrder(request.data).pipe(
              tapResponse({
                next: purchaseOrder => {
                  patchState(
                    store,
                    { purchaseOrder, purchaseOrderLines: [] },
                    setLoaded('receive')
                  );
                  toast.success('Purchase order received successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'receive'));
                  toast.warning('Failed to receive purchase order');
                },
              })
            )
          )
        )
      ),

      assignPurchaseOrderRoles: rxMethod<
        RxMethodInputWithCallback<AssignPurchaseOrderRolesRequest>
      >(
        pipe(
          tap(() => patchState(store, setLoading('assignRoles'))),
          exhaustMap(request =>
            service.assignPurchaseOrderRoles(request.data).pipe(
              tapResponse({
                next: purchaseOrder => {
                  patchState(
                    store,
                    { purchaseOrder },
                    setLoaded('assignRoles')
                  );
                  toast.success('Purchase order roles assigned successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'assignRoles'));
                  toast.warning('Failed to assign purchase order roles');
                },
              })
            )
          )
        )
      ),

      /** `id` is the purchase order number; the result lands in `purchaseOrderLines`. */
      getPurchaseOrder: rxMethod<{ id: string | number }>(
        pipe(
          tap(() => patchState(store, setLoading('getOne'))),
          switchMap(({ id }) =>
            service.getPurchaseOrder(id).pipe(
              tapResponse({
                next: purchaseOrderLines => {
                  patchState(
                    store,
                    { purchaseOrderLines },
                    setLoaded('getOne')
                  );
                },
                error: error => {
                  patchState(store, setError(error, 'getOne'));
                },
              })
            )
          )
        )
      ),

      deletePurchaseOrder: rxMethod<RxMethodInputWithCallback<string | number>>(
        pipe(
          tap(() => patchState(store, setLoading('delete'))),
          exhaustMap(({ data, callback }) =>
            service.deletePurchaseOrder(data).pipe(
              tapResponse({
                next: () => {
                  patchState(
                    store,
                    { purchaseOrder: undefined },
                    setLoaded('delete')
                  );
                  toast.success('Purchase order deleted successfully');
                  callback();
                },
                error: error => {
                  patchState(store, setError(error, 'delete'));
                  toast.warning('Failed to delete purchase order');
                },
              })
            )
          )
        )
      ),

      getAllPurchaseOrders: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading('getMany'))),
          switchMap(() =>
            service.getAllPurchaseOrders().pipe(
              tapResponse({
                next: purchaseOrders => {
                  patchState(store, { purchaseOrders }, setLoaded('getMany'));
                },
                error: error => {
                  patchState(store, setError(error, 'getMany'));
                },
              })
            )
          )
        )
      ),
    })
  )
);

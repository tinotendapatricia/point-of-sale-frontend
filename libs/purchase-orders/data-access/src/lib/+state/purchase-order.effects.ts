import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, mergeMap, tap } from 'rxjs';
import * as PurchaseOrderActions from './purchase-order.actions';
import * as PurchaseOrderFeature from './purchase-order.reducer';
import { Store } from '@ngrx/store';
import { PurchaseOrderService } from '../services/purchase-order.service';
import { Utilities } from '@pos-frontend/shared/utils';

@Injectable()
export class PurchaseOrderEffects {
  createPurchaseOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PurchaseOrderActions.createPurchaseOrder),
      mergeMap((action) =>
        this.purchaseOrderService
          .createPurchaseOrder(action.purchaseOrderDetails)
          .pipe(
            map((purchaseOrder) =>
              PurchaseOrderActions.createPurchaseOrderSuccess(purchaseOrder)
            ),
            catchError((error) =>
              of(PurchaseOrderActions.createPurchaseOrderFailure({ error }))
            )
          )
      )
    )
  );

  getPurchaseOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PurchaseOrderActions.getPurchaseOrderById),
      mergeMap((action) =>
        this.purchaseOrderService.getPurchaseOrder(action.purchaseOrderId).pipe(
          map((purchaseOrder) =>
            PurchaseOrderActions.getPurchaseOrderByIdSuccess({ purchaseOrder })
          ),
          catchError((error) =>
            of(PurchaseOrderActions.getPurchaseOrderByIdFailure({ error }))
          )
        )
      )
    )
  );

  updatePurchaseOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PurchaseOrderActions.updatePurchaseOrder),
      mergeMap((action) =>
        this.purchaseOrderService
          .updatePurchaseOrder(action.purchaseOrderDetails)
          .pipe(
            map((purchaseOrder) =>
              PurchaseOrderActions.updatePurchaseOrderSuccess(purchaseOrder)
            ),
            catchError((error) =>
              of(PurchaseOrderActions.updatePurchaseOrderFailure({ error }))
            )
          )
      )
    )
  );

  onSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          PurchaseOrderActions.createPurchaseOrderSuccess,
          PurchaseOrderActions.updatePurchaseOrderSuccess
        ),
        tap(() => Utilities.displayToast('success'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private purchaseOrderService: PurchaseOrderService,
    private store: Store<PurchaseOrderFeature.PurchaseOrderPartialState>
  ) {}
}

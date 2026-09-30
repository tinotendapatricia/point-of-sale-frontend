import {
  setError,
  setLoaded,
  setLoading,
  withCallState,
  withDevtools,
  withReset,
} from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe, switchMap, tap } from 'rxjs';

import { type RxMethodInputWithCallback, ToastService } from '@pos-frontend/core';

import {
  type AddProductsToBatchRequest,
  type AdjustStockRequest,
  type StockAdjustmentResponse,
  type StockTakeBatch,
  type StockTakeBatchProduct,
} from './stock-take.model';
import { StockTakeService } from './stock-take.service';

interface State {
  /** The batch opened by `createStockTakeBatch`. */
  stockTakeBatch: StockTakeBatch | undefined;
  /** Products counted in the batch loaded by `getBatchProducts`. */
  batchProducts: StockTakeBatchProduct[];
  /** The last adjustment made by `adjustStock`. */
  stockAdjustment: StockAdjustmentResponse | undefined;
}

const initialState: State = {
  stockTakeBatch: undefined,
  batchProducts: [],
  stockAdjustment: undefined,
};

export const StockTakeStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withDevtools('stockTake'),
  withReset(),
  withCallState({
    collections: ['create', 'addProducts', 'adjust', 'getBatchProducts'],
  }),

  withMethods(
    (store, service = inject(StockTakeService), toast = inject(ToastService)) => ({
      /** Opens a new batch; read the batch number from `stockTakeBatch()`. */
      createStockTakeBatch: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading('create'))),
          exhaustMap(() =>
            service.createStockTakeBatch().pipe(
              tapResponse({
                next: stockTakeBatch => {
                  patchState(store, { stockTakeBatch }, setLoaded('create'));
                  toast.success(
                    `Stock take batch ${stockTakeBatch.batchNumber} created successfully`
                  );
                },
                error: error => {
                  patchState(store, setError(error, 'create'));
                  toast.warning('Failed to create stock take batch');
                },
              })
            )
          )
        )
      ),

      addProductsToBatch: rxMethod<
        RxMethodInputWithCallback<AddProductsToBatchRequest>
      >(
        pipe(
          tap(() => patchState(store, setLoading('addProducts'))),
          exhaustMap(request =>
            service.addProductsToBatch(request.data).pipe(
              tapResponse({
                next: () => {
                  patchState(store, setLoaded('addProducts'));
                  toast.success(
                    `Products added to batch ${request.data.batchNumber} successfully`
                  );
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'addProducts'));
                  toast.warning('Failed to add products to batch');
                },
              })
            )
          )
        )
      ),

      adjustStock: rxMethod<RxMethodInputWithCallback<AdjustStockRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('adjust'))),
          exhaustMap(request =>
            service.adjustStock(request.data).pipe(
              tapResponse({
                next: stockAdjustment => {
                  patchState(store, { stockAdjustment }, setLoaded('adjust'));
                  toast.success(
                    `Stock adjusted successfully. Adjustment number: ${stockAdjustment.adjustment.number}`
                  );
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'adjust'));
                  toast.warning('Failed to adjust stock');
                },
              })
            )
          )
        )
      ),

      getBatchProducts: rxMethod<{ batchNumber: number }>(
        pipe(
          tap(() => patchState(store, setLoading('getBatchProducts'))),
          switchMap(({ batchNumber }) =>
            service.getBatchProducts(batchNumber).pipe(
              tapResponse({
                next: batchProducts => {
                  patchState(
                    store,
                    { batchProducts },
                    setLoaded('getBatchProducts')
                  );
                },
                error: error => {
                  patchState(store, setError(error, 'getBatchProducts'));
                },
              })
            )
          )
        )
      ),
    })
  )
);

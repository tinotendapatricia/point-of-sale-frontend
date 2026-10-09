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
import { exhaustMap, pipe, tap } from 'rxjs';

import {
  ToastService,
  type RxMethodInputWithCallback,
} from '@pos-frontend/core';

import { type CreateSaleRequest, type PosEntity } from './pos.model';
import { PosService } from './pos.service';

interface State {
  /** The last invoice the till created; a new one clears the till. */
  pos: PosEntity | undefined;
}

const initialState: State = {
  pos: undefined,
};

export const PosStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withDevtools('pos'),
  withReset(),
  withCallState({ collections: ['create'] }),

  withMethods(
    (store, service = inject(PosService), toast = inject(ToastService)) => ({
      createPos: rxMethod<RxMethodInputWithCallback<CreateSaleRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('create'))),
          exhaustMap((request) =>
            service.createPos(request.data).pipe(
              tapResponse({
                next: (pos) => {
                  patchState(store, { pos }, setLoaded('create'));
                  toast.success(
                    request.data.transactionType === 2
                      ? 'Refund processed successfully'
                      : 'Sale processed successfully'
                  );
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'create'));
                  toast.warning('Failed to process transaction');
                },
              })
            )
          )
        )
      ),
    })
  )
);

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

import { ToastService, type RxMethodInputWithCallback } from '@pos-frontend/core';

import { type VatEntity } from './vat.model';
import { VatService } from './vat.service';

/** VAT is a single setting: there is no list or paginated endpoint. */
interface State {
  vat: VatEntity | undefined;
}

const initialState: State = {
  vat: undefined,
};

export const VatStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withDevtools('vat'),
  withReset(),
  withCallState({
    collections: ['getOne', 'update'],
  }),

  withMethods(
    (store, service = inject(VatService), toast = inject(ToastService)) => ({
      getVat: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading('getOne'))),
          switchMap(() =>
            service.getVat().pipe(
              tapResponse({
                next: vat => {
                  patchState(store, { vat }, setLoaded('getOne'));
                },
                error: error => {
                  patchState(store, setError(error, 'getOne'));
                },
              })
            )
          )
        )
      ),

      updateVat: rxMethod<RxMethodInputWithCallback<VatEntity>>(
        pipe(
          tap(() => patchState(store, setLoading('update'))),
          exhaustMap(request =>
            service.updateVat(request.data).pipe(
              tapResponse({
                next: vat => {
                  patchState(store, { vat }, setLoaded('update'));
                  toast.success('VAT updated successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'update'));
                  toast.warning('Failed to update VAT');
                },
              })
            )
          )
        )
      ),
    })
  )
);

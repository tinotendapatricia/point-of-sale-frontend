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

import { ToastService, type RxMethodInputWithCallback } from '@pos-frontend/core';
import { type Page } from '@pos-frontend/shared/data-access';

import {
  type AssignDebtorRolesRequest,
  type DebtorFilters,
  type DebtorRequest,
  type DebtorsEntity,
  type UpdateDebtorRequest,
} from './debtor.model';
import { DebtorService } from './debtor.service';

interface State {
  debtor: DebtorsEntity | undefined;
  debtors: DebtorsEntity[];
  debtorsPage: Page<DebtorsEntity> | undefined;
}

const initialState: State = {
  debtor: undefined,
  debtors: [],
  debtorsPage: undefined,
};

export const DebtorStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withDevtools('debtors'),
  withReset(),
  withCallState({
    collections: [
      'getOne',
      'getMany',
      'getPaginated',
      'create',
      'assignRoles',
      'update',
      'delete',
    ],
  }),

  withComputed(({ debtorsPage }) => ({
    paginatedDebtors: computed(() => debtorsPage()?.content ?? []),
    totalDebtors: computed(() => debtorsPage()?.totalElements ?? 0),
  })),

  withMethods(
    (store, service = inject(DebtorService), toast = inject(ToastService)) => ({
      getPaginatedDebtors: rxMethod<DebtorFilters | void>(
        pipe(
          tap(() => patchState(store, setLoading('getPaginated'))),
          switchMap(filters =>
            service.getPaginatedDebtors(filters ?? {}).pipe(
              tapResponse({
                next: debtorsPage => {
                  patchState(store, { debtorsPage }, setLoaded('getPaginated'));
                },
                error: error => {
                  patchState(store, setError(error, 'getPaginated'));
                },
              })
            )
          )
        )
      ),

      createDebtor: rxMethod<RxMethodInputWithCallback<DebtorRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('create'))),
          exhaustMap(request =>
            service.createDebtor(request.data).pipe(
              tapResponse({
                next: debtor => {
                  patchState(store, { debtor }, setLoaded('create'));
                  toast.success('Debtor created successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'create'));
                  toast.warning('Failed to create debtor');
                },
              })
            )
          )
        )
      ),

      assignDebtorRoles: rxMethod<
        RxMethodInputWithCallback<AssignDebtorRolesRequest>
      >(
        pipe(
          tap(() => patchState(store, setLoading('assignRoles'))),
          exhaustMap(request =>
            service.assignDebtorRoles(request.data).pipe(
              tapResponse({
                next: debtor => {
                  patchState(store, { debtor }, setLoaded('assignRoles'));
                  toast.success('Debtor roles assigned successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'assignRoles'));
                  toast.warning('Failed to assign debtor roles');
                },
              })
            )
          )
        )
      ),

      getDebtor: rxMethod<{ id: string | number }>(
        pipe(
          tap(() => patchState(store, setLoading('getOne'))),
          switchMap(({ id }) =>
            service.getDebtor(id).pipe(
              tapResponse({
                next: debtor => {
                  patchState(store, { debtor }, setLoaded('getOne'));
                },
                error: error => {
                  patchState(store, setError(error, 'getOne'));
                },
              })
            )
          )
        )
      ),

      updateDebtor: rxMethod<RxMethodInputWithCallback<UpdateDebtorRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('update'))),
          exhaustMap(request =>
            service.updateDebtor(request.data).pipe(
              tapResponse({
                next: debtor => {
                  patchState(store, { debtor }, setLoaded('update'));
                  toast.success('Debtor updated successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'update'));
                  toast.warning('Failed to update debtor');
                },
              })
            )
          )
        )
      ),

      deleteDebtor: rxMethod<RxMethodInputWithCallback<string | number>>(
        pipe(
          tap(() => patchState(store, setLoading('delete'))),
          exhaustMap(({ data, callback }) =>
            service.deleteDebtor(data).pipe(
              tapResponse({
                next: () => {
                  patchState(store, { debtor: undefined }, setLoaded('delete'));
                  toast.success('Debtor deleted successfully');
                  callback();
                },
                error: error => {
                  patchState(store, setError(error, 'delete'));
                  toast.warning('Failed to delete debtor');
                },
              })
            )
          )
        )
      ),

      getAllDebtors: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading('getMany'))),
          switchMap(() =>
            service.getAllDebtors().pipe(
              tapResponse({
                next: debtors => {
                  patchState(store, { debtors }, setLoaded('getMany'));
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

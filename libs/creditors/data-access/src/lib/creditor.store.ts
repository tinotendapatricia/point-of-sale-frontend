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
  type AssignCreditorRolesRequest,
  type CreditorFilters,
  type CreditorRequest,
  type CreditorsEntity,
  type UpdateCreditorRequest,
} from './creditor.model';
import { CreditorService } from './creditor.service';

interface State {
  creditor: CreditorsEntity | undefined;
  creditors: CreditorsEntity[];
  creditorsPage: Page<CreditorsEntity> | undefined;
}

const initialState: State = {
  creditor: undefined,
  creditors: [],
  creditorsPage: undefined,
};

export const CreditorStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withDevtools('creditors'),
  withReset(),
  withCallState({
    collections: [
      'getPaginated',
      'getMany',
      'getOne',
      'create',
      'update',
      'assignRoles',
      'delete',
    ],
  }),

  withComputed(({ creditorsPage }) => ({
    paginatedCreditors: computed(() => creditorsPage()?.content ?? []),
    totalCreditors: computed(() => creditorsPage()?.totalElements ?? 0),
  })),

  withMethods(
    (store, service = inject(CreditorService), toast = inject(ToastService)) => ({
      getPaginatedCreditors: rxMethod<CreditorFilters | void>(
        pipe(
          tap(() => patchState(store, setLoading('getPaginated'))),
          switchMap(filters =>
            service.getPaginatedCreditors(filters ?? {}).pipe(
              tapResponse({
                next: creditorsPage => {
                  patchState(store, { creditorsPage }, setLoaded('getPaginated'));
                },
                error: error => {
                  patchState(store, setError(error, 'getPaginated'));
                },
              })
            )
          )
        )
      ),

      createCreditor: rxMethod<RxMethodInputWithCallback<CreditorRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('create'))),
          exhaustMap(request =>
            service.createCreditor(request.data).pipe(
              tapResponse({
                next: creditor => {
                  patchState(store, { creditor }, setLoaded('create'));
                  toast.success('Creditor created successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'create'));
                  toast.warning('Failed to create creditor');
                },
              })
            )
          )
        )
      ),

      assignCreditorRoles: rxMethod<
        RxMethodInputWithCallback<AssignCreditorRolesRequest>
      >(
        pipe(
          tap(() => patchState(store, setLoading('assignRoles'))),
          exhaustMap(request =>
            service.assignCreditorRoles(request.data).pipe(
              tapResponse({
                next: creditor => {
                  patchState(store, { creditor }, setLoaded('assignRoles'));
                  toast.success('Creditor roles assigned successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'assignRoles'));
                  toast.warning('Failed to assign creditor roles');
                },
              })
            )
          )
        )
      ),

      getCreditor: rxMethod<{ id: string | number }>(
        pipe(
          tap(() => patchState(store, setLoading('getOne'))),
          switchMap(({ id }) =>
            service.getCreditor(id).pipe(
              tapResponse({
                next: creditor => {
                  patchState(store, { creditor }, setLoaded('getOne'));
                },
                error: error => {
                  patchState(store, setError(error, 'getOne'));
                },
              })
            )
          )
        )
      ),

      updateCreditor: rxMethod<RxMethodInputWithCallback<UpdateCreditorRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('update'))),
          exhaustMap(request =>
            service.updateCreditor(request.data).pipe(
              tapResponse({
                next: creditor => {
                  patchState(store, { creditor }, setLoaded('update'));
                  toast.success('Creditor updated successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'update'));
                  toast.warning('Failed to update creditor');
                },
              })
            )
          )
        )
      ),

      deleteCreditor: rxMethod<RxMethodInputWithCallback<string | number>>(
        pipe(
          tap(() => patchState(store, setLoading('delete'))),
          exhaustMap(({ data, callback }) =>
            service.deleteCreditor(data).pipe(
              tapResponse({
                next: () => {
                  patchState(store, { creditor: undefined }, setLoaded('delete'));
                  toast.success('Creditor deleted successfully');
                  callback();
                },
                error: error => {
                  patchState(store, setError(error, 'delete'));
                  toast.warning('Failed to delete creditor');
                },
              })
            )
          )
        )
      ),

      getAllCreditors: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading('getMany'))),
          switchMap(() =>
            service.getAllCreditors().pipe(
              tapResponse({
                next: creditors => {
                  patchState(store, { creditors }, setLoaded('getMany'));
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

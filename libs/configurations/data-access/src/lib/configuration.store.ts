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
  type AssignConfigurationRolesRequest,
  type ConfigurationFilters,
  type ConfigurationRequest,
  type ConfigurationsEntity,
  type PendingCashup,
  type UpdateConfigurationRequest,
} from './configuration.model';
import { ConfigurationService } from './configuration.service';

interface State {
  configuration: ConfigurationsEntity | undefined;
  configurations: ConfigurationsEntity[];
  configurationsPage: Page<ConfigurationsEntity> | undefined;
  pendingCashups: PendingCashup[];
}

const initialState: State = {
  configuration: undefined,
  configurations: [],
  configurationsPage: undefined,
  pendingCashups: [],
};

export const ConfigurationStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withDevtools('configurations'),
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
      'getPendingCashups',
    ],
  }),

  withComputed(({ configurationsPage }) => ({
    paginatedConfigurations: computed(() => configurationsPage()?.content ?? []),
    totalConfigurations: computed(() => configurationsPage()?.totalElements ?? 0),
  })),

  withMethods(
    (store, service = inject(ConfigurationService), toast = inject(ToastService)) => ({
      getPaginatedConfigurations: rxMethod<ConfigurationFilters | void>(
        pipe(
          tap(() => patchState(store, setLoading('getPaginated'))),
          switchMap(filters =>
            service.getPaginatedConfigurations(filters ?? {}).pipe(
              tapResponse({
                next: configurationsPage => {
                  patchState(store, { configurationsPage }, setLoaded('getPaginated'));
                },
                error: error => {
                  patchState(store, setError(error, 'getPaginated'));
                },
              })
            )
          )
        )
      ),

      createConfiguration: rxMethod<RxMethodInputWithCallback<ConfigurationRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('create'))),
          exhaustMap(request =>
            service.createConfiguration(request.data).pipe(
              tapResponse({
                next: configuration => {
                  patchState(store, { configuration }, setLoaded('create'));
                  toast.success('Configuration created successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'create'));
                  toast.warning('Failed to create configuration');
                },
              })
            )
          )
        )
      ),

      assignConfigurationRoles: rxMethod<
        RxMethodInputWithCallback<AssignConfigurationRolesRequest>
      >(
        pipe(
          tap(() => patchState(store, setLoading('assignRoles'))),
          exhaustMap(request =>
            service.assignConfigurationRoles(request.data).pipe(
              tapResponse({
                next: configuration => {
                  patchState(store, { configuration }, setLoaded('assignRoles'));
                  toast.success('Configuration roles assigned successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'assignRoles'));
                  toast.warning('Failed to assign configuration roles');
                },
              })
            )
          )
        )
      ),

      getConfiguration: rxMethod<{ id: string | number }>(
        pipe(
          tap(() => patchState(store, setLoading('getOne'))),
          switchMap(({ id }) =>
            service.getConfiguration(id).pipe(
              tapResponse({
                next: configuration => {
                  patchState(store, { configuration }, setLoaded('getOne'));
                },
                error: error => {
                  patchState(store, setError(error, 'getOne'));
                },
              })
            )
          )
        )
      ),

      updateConfiguration: rxMethod<RxMethodInputWithCallback<UpdateConfigurationRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('update'))),
          exhaustMap(request =>
            service.updateConfiguration(request.data).pipe(
              tapResponse({
                next: configuration => {
                  patchState(store, { configuration }, setLoaded('update'));
                  toast.success('Configuration updated successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'update'));
                  toast.warning('Failed to update configuration');
                },
              })
            )
          )
        )
      ),

      deleteConfiguration: rxMethod<RxMethodInputWithCallback<string | number>>(
        pipe(
          tap(() => patchState(store, setLoading('delete'))),
          exhaustMap(({ data, callback }) =>
            service.deleteConfiguration(data).pipe(
              tapResponse({
                next: () => {
                  patchState(store, { configuration: undefined }, setLoaded('delete'));
                  toast.success('Configuration deleted successfully');
                  callback();
                },
                error: error => {
                  patchState(store, setError(error, 'delete'));
                  toast.warning('Failed to delete configuration');
                },
              })
            )
          )
        )
      ),

      getAllConfigurations: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading('getMany'))),
          switchMap(() =>
            service.getAllConfigurations().pipe(
              tapResponse({
                next: configurations => {
                  patchState(store, { configurations }, setLoaded('getMany'));
                },
                error: error => {
                  patchState(store, setError(error, 'getMany'));
                },
              })
            )
          )
        )
      ),
      getPendingCashups: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading('getPendingCashups'))),
          switchMap(() =>
            service.getPendingCashups().pipe(
              tapResponse({
                next: pendingCashups => {
                  patchState(store, { pendingCashups }, setLoaded('getPendingCashups'));
                },
                error: error => {
                  patchState(store, setError(error, 'getPendingCashups'));
                },
              })
            )
          )
        )
      ),
    })
  )
);

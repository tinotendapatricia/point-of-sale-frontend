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
  type AssignStationRolesRequest,
  type CreateStationRequest,
  type StationFilters,
  type StationsEntity,
  type UpdateStationRequest,
} from './station.model';
import { StationService } from './station.service';

interface State {
  station: StationsEntity | undefined;
  stations: StationsEntity[];
  stationsPage: Page<StationsEntity> | undefined;
}

const initialState: State = {
  station: undefined,
  stations: [],
  stationsPage: undefined,
};

export const StationStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withDevtools('stations'),
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

  withComputed(({ stationsPage }) => ({
    paginatedStations: computed(() => stationsPage()?.content ?? []),
    totalStations: computed(() => stationsPage()?.totalElements ?? 0),
  })),

  withMethods(
    (store, service = inject(StationService), toast = inject(ToastService)) => ({
      getPaginatedStations: rxMethod<StationFilters | void>(
        pipe(
          tap(() => patchState(store, setLoading('getPaginated'))),
          switchMap(filters =>
            service.getPaginatedStations(filters ?? {}).pipe(
              tapResponse({
                next: stationsPage => {
                  patchState(
                    store,
                    { stationsPage },
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

      createStation: rxMethod<RxMethodInputWithCallback<CreateStationRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('create'))),
          exhaustMap(request =>
            service.createStation(request.data).pipe(
              tapResponse({
                next: station => {
                  patchState(store, { station }, setLoaded('create'));
                  toast.success('Station created successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'create'));
                  toast.warning('Failed to create station');
                },
              })
            )
          )
        )
      ),

      assignStationRoles: rxMethod<
        RxMethodInputWithCallback<AssignStationRolesRequest>
      >(
        pipe(
          tap(() => patchState(store, setLoading('assignRoles'))),
          exhaustMap(request =>
            service.assignStationRoles(request.data).pipe(
              tapResponse({
                next: station => {
                  patchState(store, { station }, setLoaded('assignRoles'));
                  toast.success('Station roles assigned successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'assignRoles'));
                  toast.warning('Failed to assign station roles');
                },
              })
            )
          )
        )
      ),

      getStation: rxMethod<{ id: string | number }>(
        pipe(
          tap(() => patchState(store, setLoading('getOne'))),
          switchMap(({ id }) =>
            service.getStation(id).pipe(
              tapResponse({
                next: station => {
                  patchState(store, { station }, setLoaded('getOne'));
                },
                error: error => {
                  patchState(store, setError(error, 'getOne'));
                },
              })
            )
          )
        )
      ),

      updateStation: rxMethod<RxMethodInputWithCallback<UpdateStationRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('update'))),
          exhaustMap(request =>
            service.updateStation(request.data).pipe(
              tapResponse({
                next: station => {
                  patchState(store, { station }, setLoaded('update'));
                  toast.success('Station updated successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'update'));
                  toast.warning('Failed to update station');
                },
              })
            )
          )
        )
      ),

      deleteStation: rxMethod<RxMethodInputWithCallback<string | number>>(
        pipe(
          tap(() => patchState(store, setLoading('delete'))),
          exhaustMap(({ data, callback }) =>
            service.deleteStation(data).pipe(
              tapResponse({
                next: () => {
                  patchState(store, { station: undefined }, setLoaded('delete'));
                  toast.success('Station deleted successfully');
                  callback();
                },
                error: error => {
                  patchState(store, setError(error, 'delete'));
                  toast.warning('Failed to delete station');
                },
              })
            )
          )
        )
      ),

      getAllStations: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading('getMany'))),
          switchMap(() =>
            service.getAllStations().pipe(
              tapResponse({
                next: stations => {
                  patchState(store, { stations }, setLoaded('getMany'));
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

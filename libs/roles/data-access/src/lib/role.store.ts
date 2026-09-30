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
import { ToastService, type RxMethodInputWithCallback } from '@pos-frontend/core';
import { type Page } from '@pos-frontend/shared/data-access';
import { exhaustMap, pipe, switchMap, tap } from 'rxjs';

import {
  type CreateRoleRequest,
  type RoleFilters,
  type RolesEntity,
  type UpdateRoleRequest,
} from './role.model';
import { RoleService } from './role.service';

interface State {
  role: RolesEntity | undefined;
  roles: RolesEntity[];
  rolesPage: Page<RolesEntity> | undefined;
}

const initialState: State = {
  role: undefined,
  roles: [],
  rolesPage: undefined,
};

export const RoleStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withDevtools('roles'),
  withReset(),
  withCallState({
    collections: ['getOne', 'getMany', 'getPaginated', 'create', 'update', 'delete'],
  }),

  withComputed(({ rolesPage }) => ({
    paginatedRoles: computed(() => rolesPage()?.content ?? []),
    totalRoles: computed(() => rolesPage()?.totalElements ?? 0),
  })),

  withMethods(
    (store, service = inject(RoleService), toast = inject(ToastService)) => ({
      getPaginatedRoles: rxMethod<RoleFilters | void>(
        pipe(
          tap(() => patchState(store, setLoading('getPaginated'))),
          switchMap((filters) =>
            service.getPaginatedRoles(filters ?? {}).pipe(
              tapResponse({
                next: (rolesPage) =>
                  patchState(store, { rolesPage }, setLoaded('getPaginated')),
                error: (error) =>
                  patchState(store, setError(error, 'getPaginated')),
              })
            )
          )
        )
      ),

      getAllRoles: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading('getMany'))),
          switchMap(() =>
            service.getAllRoles().pipe(
              tapResponse({
                next: (roles) =>
                  patchState(store, { roles }, setLoaded('getMany')),
                error: (error) => patchState(store, setError(error, 'getMany')),
              })
            )
          )
        )
      ),

      getRole: rxMethod<{ id: string | number }>(
        pipe(
          tap(() => patchState(store, setLoading('getOne'))),
          switchMap(({ id }) =>
            service.getRole(id).pipe(
              tapResponse({
                next: (role) => patchState(store, { role }, setLoaded('getOne')),
                error: (error) => patchState(store, setError(error, 'getOne')),
              })
            )
          )
        )
      ),

      createRole: rxMethod<RxMethodInputWithCallback<CreateRoleRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('create'))),
          exhaustMap((request) =>
            service.createRole(request.data).pipe(
              tapResponse({
                next: (role) => {
                  patchState(store, { role }, setLoaded('create'));
                  toast.success('Role created successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'create'));
                  toast.warning('Failed to create role');
                },
              })
            )
          )
        )
      ),

      updateRole: rxMethod<RxMethodInputWithCallback<UpdateRoleRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('update'))),
          exhaustMap((request) =>
            service.updateRole(request.data).pipe(
              tapResponse({
                next: (role) => {
                  patchState(store, { role }, setLoaded('update'));
                  toast.success('Role updated successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'update'));
                  toast.warning('Failed to update role');
                },
              })
            )
          )
        )
      ),

      deleteRole: rxMethod<RxMethodInputWithCallback<string | number>>(
        pipe(
          tap(() => patchState(store, setLoading('delete'))),
          exhaustMap(({ data, callback }) =>
            service.deleteRole(data).pipe(
              tapResponse({
                next: () => {
                  patchState(store, { role: undefined }, setLoaded('delete'));
                  toast.success('Role deleted successfully');
                  callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'delete'));
                  toast.warning('Failed to delete role');
                },
              })
            )
          )
        )
      ),
    })
  )
);

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
  type AssignGroupRolesRequest,
  type CreateGroupRequest,
  type GroupFilters,
  type GroupsEntity,
  type UpdateGroupRequest,
} from './group.model';
import { GroupService } from './group.service';

interface State {
  group: GroupsEntity | undefined;
  groups: GroupsEntity[];
  groupsPage: Page<GroupsEntity> | undefined;
}

const initialState: State = {
  group: undefined,
  groups: [],
  groupsPage: undefined,
};

export const GroupStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withDevtools('groups'),
  withReset(),
  withCallState({
    collections: [
      'getOne',
      'getMany',
      'getPaginated',
      'create',
      'update',
      'assignRoles',
      'delete',
    ],
  }),

  withComputed(({ groupsPage }) => ({
    paginatedGroups: computed(() => groupsPage()?.content ?? []),
    totalGroups: computed(() => groupsPage()?.totalElements ?? 0),
  })),

  withMethods(
    (store, service = inject(GroupService), toast = inject(ToastService)) => ({
      getPaginatedGroups: rxMethod<GroupFilters | void>(
        pipe(
          tap(() => patchState(store, setLoading('getPaginated'))),
          switchMap((filters) =>
            service.getPaginatedGroups(filters ?? {}).pipe(
              tapResponse({
                next: (groupsPage) =>
                  patchState(store, { groupsPage }, setLoaded('getPaginated')),
                error: (error) =>
                  patchState(store, setError(error, 'getPaginated')),
              })
            )
          )
        )
      ),

      getAllGroups: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading('getMany'))),
          switchMap(() =>
            service.getAllGroups().pipe(
              tapResponse({
                next: (groups) =>
                  patchState(store, { groups }, setLoaded('getMany')),
                error: (error) => patchState(store, setError(error, 'getMany')),
              })
            )
          )
        )
      ),

      getGroup: rxMethod<{ id: string | number }>(
        pipe(
          tap(() => patchState(store, setLoading('getOne'))),
          switchMap(({ id }) =>
            service.getGroup(id).pipe(
              tapResponse({
                next: (group) =>
                  patchState(store, { group }, setLoaded('getOne')),
                error: (error) => patchState(store, setError(error, 'getOne')),
              })
            )
          )
        )
      ),

      createGroup: rxMethod<RxMethodInputWithCallback<CreateGroupRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('create'))),
          exhaustMap((request) =>
            service.createGroup(request.data).pipe(
              tapResponse({
                next: (group) => {
                  patchState(store, { group }, setLoaded('create'));
                  toast.success('Group created successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'create'));
                  toast.warning('Failed to create group');
                },
              })
            )
          )
        )
      ),

      assignGroupRoles: rxMethod<
        RxMethodInputWithCallback<AssignGroupRolesRequest>
      >(
        pipe(
          tap(() => patchState(store, setLoading('assignRoles'))),
          exhaustMap((request) =>
            service.assignGroupRoles(request.data).pipe(
              tapResponse({
                next: (group) => {
                  patchState(store, { group }, setLoaded('assignRoles'));
                  toast.success('Group roles assigned successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'assignRoles'));
                  toast.warning('Failed to assign group roles');
                },
              })
            )
          )
        )
      ),

      updateGroup: rxMethod<RxMethodInputWithCallback<UpdateGroupRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('update'))),
          exhaustMap((request) =>
            service.updateGroup(request.data).pipe(
              tapResponse({
                next: (group) => {
                  patchState(store, { group }, setLoaded('update'));
                  toast.success('Group updated successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'update'));
                  toast.warning('Failed to update group');
                },
              })
            )
          )
        )
      ),

      deleteGroup: rxMethod<RxMethodInputWithCallback<string | number>>(
        pipe(
          tap(() => patchState(store, setLoading('delete'))),
          exhaustMap(({ data, callback }) =>
            service.deleteGroup(data).pipe(
              tapResponse({
                next: () => {
                  patchState(store, { group: undefined }, setLoaded('delete'));
                  toast.success('Group deleted successfully');
                  callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'delete'));
                  toast.warning('Failed to delete group');
                },
              })
            )
          )
        )
      ),
    })
  )
);

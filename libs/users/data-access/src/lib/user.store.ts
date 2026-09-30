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
  type AssignUserRolesRequest,
  type ChangeUserStatusRequest,
  type CreateUserContext,
  type UpdateMyAccountRequest,
  type UpdateUserRequest,
  type UserFilters,
  type UsersEntity,
} from './user.model';
import { UserService } from './user.service';

interface State {
  user: UsersEntity | undefined;
  users: UsersEntity[];
  usersPage: Page<UsersEntity> | undefined;
  /** The signed-in user's own account (my-account / client profile). */
  profile: UsersEntity | undefined;
}

const initialState: State = {
  user: undefined,
  users: [],
  usersPage: undefined,
  profile: undefined,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withDevtools('users'),
  withReset(),
  withCallState({
    collections: [
      'getOne',
      'getMany',
      'getPaginated',
      'getProfile',
      'create',
      'update',
      'changeStatus',
      'assignRoles',
    ],
  }),

  withComputed(({ usersPage }) => ({
    paginatedUsers: computed(() => usersPage()?.content ?? []),
    totalUsers: computed(() => usersPage()?.totalElements ?? 0),
  })),

  withMethods(
    (store, service = inject(UserService), toast = inject(ToastService)) => ({
      getPaginatedUsers: rxMethod<UserFilters | void>(
        pipe(
          tap(() => patchState(store, setLoading('getPaginated'))),
          switchMap((filters) =>
            service.getPaginatedUsers(filters ?? {}).pipe(
              tapResponse({
                next: (usersPage) =>
                  patchState(store, { usersPage }, setLoaded('getPaginated')),
                error: (error) =>
                  patchState(store, setError(error, 'getPaginated')),
              })
            )
          )
        )
      ),

      getAllUsers: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading('getMany'))),
          switchMap(() =>
            service.getAllUsers().pipe(
              tapResponse({
                next: (users) =>
                  patchState(store, { users }, setLoaded('getMany')),
                error: (error) => patchState(store, setError(error, 'getMany')),
              })
            )
          )
        )
      ),

      getUser: rxMethod<{ id: string | number }>(
        pipe(
          tap(() => patchState(store, setLoading('getOne'))),
          switchMap(({ id }) =>
            service.getUser(id).pipe(
              tapResponse({
                next: (user) => patchState(store, { user }, setLoaded('getOne')),
                error: (error) => patchState(store, setError(error, 'getOne')),
              })
            )
          )
        )
      ),

      getUserProfile: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading('getProfile'))),
          switchMap(() =>
            service.getUserProfile().pipe(
              tapResponse({
                next: (profile) =>
                  patchState(store, { profile }, setLoaded('getProfile')),
                error: (error) =>
                  patchState(store, setError(error, 'getProfile')),
              })
            )
          )
        )
      ),

      getClientUserProfile: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading('getProfile'))),
          switchMap(() =>
            service.getClientUserProfile().pipe(
              tapResponse({
                next: (profile) =>
                  patchState(store, { profile }, setLoaded('getProfile')),
                error: (error) =>
                  patchState(store, setError(error, 'getProfile')),
              })
            )
          )
        )
      ),

      createUser: rxMethod<RxMethodInputWithCallback<CreateUserContext>>(
        pipe(
          tap(() => patchState(store, setLoading('create'))),
          exhaustMap((request) =>
            service.createUser(request.data).pipe(
              tapResponse({
                next: (user) => {
                  patchState(store, { user }, setLoaded('create'));
                  toast.success('User created successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'create'));
                  toast.warning('Failed to create user');
                },
              })
            )
          )
        )
      ),

      changeUserStatus: rxMethod<
        RxMethodInputWithCallback<ChangeUserStatusRequest>
      >(
        pipe(
          tap(() => patchState(store, setLoading('changeStatus'))),
          exhaustMap((request) =>
            service.changeUserStatus(request.data).pipe(
              tapResponse({
                next: (user) => {
                  patchState(store, { user }, setLoaded('changeStatus'));
                  toast.success('User status changed successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'changeStatus'));
                  toast.warning('Failed to change user status');
                },
              })
            )
          )
        )
      ),

      assignUserRoles: rxMethod<
        RxMethodInputWithCallback<AssignUserRolesRequest>
      >(
        pipe(
          tap(() => patchState(store, setLoading('assignRoles'))),
          exhaustMap((request) =>
            service.assignUserRoles(request.data).pipe(
              tapResponse({
                next: (user) => {
                  patchState(store, { user }, setLoaded('assignRoles'));
                  toast.success('User roles assigned successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'assignRoles'));
                  toast.warning('Failed to assign user roles');
                },
              })
            )
          )
        )
      ),

      updateUser: rxMethod<RxMethodInputWithCallback<UpdateUserRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('update'))),
          exhaustMap((request) =>
            service.updateUser(request.data).pipe(
              tapResponse({
                next: (user) => {
                  patchState(store, { user }, setLoaded('update'));
                  toast.success('User updated successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'update'));
                  toast.warning('Failed to update user');
                },
              })
            )
          )
        )
      ),

      updateMyAccount: rxMethod<
        RxMethodInputWithCallback<UpdateMyAccountRequest>
      >(
        pipe(
          tap(() => patchState(store, setLoading('update'))),
          exhaustMap((request) =>
            service.updateMyAccount(request.data).pipe(
              tapResponse({
                next: (profile) => {
                  patchState(store, { profile }, setLoaded('update'));
                  toast.success('Account updated successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'update'));
                  toast.warning('Failed to update account');
                },
              })
            )
          )
        )
      ),
    })
  )
);

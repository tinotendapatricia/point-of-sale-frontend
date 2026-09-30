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

import { ToastService, type RxMethodInputWithCallback } from '@pos-frontend/core';

import { AuthenticationService } from './auth.service';
import { type LoginCredentials, type RegisterRequest } from './auth.model';

interface State {
  userId: string | undefined;
  authenticated: boolean;
}

/** Read the session once when the store is created, so a reload stays logged in. */
const initialState = (): State => ({
  userId: sessionStorage.getItem('userId') ?? undefined,
  authenticated: Boolean(sessionStorage.getItem('accessToken')),
});

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withDevtools('auth'),
  withReset(),
  withCallState({ collections: ['login', 'register'] }),

  withMethods(
    (
      store,
      service = inject(AuthenticationService),
      toast = inject(ToastService)
    ) => ({
      adminLogin: rxMethod<RxMethodInputWithCallback<LoginCredentials>>(
        pipe(
          tap(() => patchState(store, setLoading('login'))),
          exhaustMap(request =>
            service.adminLogin(request.data).pipe(
              tapResponse({
                next: session => {
                  service.saveSession(session);
                  patchState(
                    store,
                    { userId: String(session.userId), authenticated: true },
                    setLoaded('login')
                  );
                  toast.success('Logged in successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'login'));
                  toast.warning('Failed to log in');
                },
              })
            )
          )
        )
      ),

      clientLogin: rxMethod<RxMethodInputWithCallback<LoginCredentials>>(
        pipe(
          tap(() => patchState(store, setLoading('login'))),
          exhaustMap(request =>
            service.clientLogin(request.data).pipe(
              tapResponse({
                next: session => {
                  service.saveSession(session);
                  patchState(
                    store,
                    { userId: String(session.userId), authenticated: true },
                    setLoaded('login')
                  );
                  toast.success('Logged in successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'login'));
                  toast.warning('Failed to log in');
                },
              })
            )
          )
        )
      ),

      register: rxMethod<RxMethodInputWithCallback<RegisterRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('register'))),
          exhaustMap(request =>
            service.register(request.data).pipe(
              tapResponse({
                next: () => {
                  patchState(store, setLoaded('register'));
                  toast.success('User registered successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'register'));
                  toast.warning('Failed to register user');
                },
              })
            )
          )
        )
      ),

      /** Clears the session and goes to the login page. */
      logout(): void {
        service.logout();
        patchState(store, { userId: undefined, authenticated: false });
      },
    })
  )
);

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

import {
  ToastService,
  type RxMethodInputWithCallback,
} from '@pos-frontend/core';
import { type Page } from '@pos-frontend/shared/data-access';

import {
  type CreateCurrencyRequest,
  type CurrencyEntity,
  type CurrencyFilters,
  type MakeDefaultCurrencyRequest,
  type UpdateRateRequest,
} from './currency.model';
import { CurrencyService } from './currency.service';

interface State {
  currency: CurrencyEntity | undefined;
  currencies: CurrencyEntity[];
  currenciesPage: Page<CurrencyEntity> | undefined;
  defaultCurrency: CurrencyEntity | undefined;
}

const initialState: State = {
  currency: undefined,
  currencies: [],
  currenciesPage: undefined,
  defaultCurrency: undefined,
};

export const CurrencyStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withDevtools('currencies'),
  withReset(),
  withCallState({
    collections: [
      'getPaginated',
      'create',
      'makeDefault',
      'getOne',
      'getDefault',
      'update',
      'updateRate',
      'delete',
      'getMany',
    ],
  }),

  withComputed(({ currenciesPage }) => ({
    paginatedCurrencies: computed(() => currenciesPage()?.content ?? []),
    totalCurrencies: computed(() => currenciesPage()?.totalElements ?? 0),
  })),

  withMethods(
    (
      store,
      service = inject(CurrencyService),
      toast = inject(ToastService)
    ) => ({
      getPaginatedCurrencies: rxMethod<CurrencyFilters | void>(
        pipe(
          tap(() => patchState(store, setLoading('getPaginated'))),
          switchMap((filters) =>
            service.getPaginatedCurrencies(filters ?? undefined).pipe(
              tapResponse({
                next: (currenciesPage) => {
                  patchState(
                    store,
                    { currenciesPage },
                    setLoaded('getPaginated')
                  );
                },
                error: (error) => {
                  patchState(store, setError(error, 'getPaginated'));
                },
              })
            )
          )
        )
      ),

      createCurrency: rxMethod<
        RxMethodInputWithCallback<CreateCurrencyRequest>
      >(
        pipe(
          tap(() => patchState(store, setLoading('create'))),
          exhaustMap((request) =>
            service.createCurrency(request.data).pipe(
              tapResponse({
                next: (currency) => {
                  patchState(store, { currency }, setLoaded('create'));
                  toast.success('Currency created successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'create'));
                  toast.warning('Failed to create currency');
                },
              })
            )
          )
        )
      ),

      makeDefault: rxMethod<
        RxMethodInputWithCallback<MakeDefaultCurrencyRequest>
      >(
        pipe(
          tap(() => patchState(store, setLoading('makeDefault'))),
          exhaustMap((request) =>
            service.makeDefaultCurrency(request.data).pipe(
              tapResponse({
                next: (currency) => {
                  patchState(
                    store,
                    { currency, defaultCurrency: currency },
                    setLoaded('makeDefault')
                  );
                  toast.success('Default currency updated successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'makeDefault'));
                  toast.warning('Failed to update default currency');
                },
              })
            )
          )
        )
      ),

      getCurrency: rxMethod<{ id: string | number }>(
        pipe(
          tap(() => patchState(store, setLoading('getOne'))),
          switchMap(({ id }) =>
            service.getCurrency(id).pipe(
              tapResponse({
                next: (currency) => {
                  patchState(store, { currency }, setLoaded('getOne'));
                },
                error: (error) => {
                  patchState(store, setError(error, 'getOne'));
                },
              })
            )
          )
        )
      ),

      getDefaultCurrency: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading('getDefault'))),
          switchMap(() =>
            service.getDefaultCurrency().pipe(
              tapResponse({
                next: (defaultCurrency) => {
                  patchState(
                    store,
                    { defaultCurrency },
                    setLoaded('getDefault')
                  );
                },
                error: (error) => {
                  patchState(store, setError(error, 'getDefault'));
                },
              })
            )
          )
        )
      ),

      updateCurrency: rxMethod<RxMethodInputWithCallback<CurrencyEntity>>(
        pipe(
          tap(() => patchState(store, setLoading('update'))),
          exhaustMap((request) =>
            service.updateCurrency(request.data).pipe(
              tapResponse({
                next: (currency) => {
                  patchState(store, { currency }, setLoaded('update'));
                  toast.success('Currency updated successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'update'));
                  toast.warning('Failed to update currency');
                },
              })
            )
          )
        )
      ),

      updateRate: rxMethod<RxMethodInputWithCallback<UpdateRateRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('updateRate'))),
          exhaustMap((request) =>
            service.updateRate(request.data).pipe(
              tapResponse({
                next: (currency) => {
                  patchState(store, { currency }, setLoaded('updateRate'));
                  toast.success('Rate updated successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'updateRate'));
                  toast.warning('Failed to update rate');
                },
              })
            )
          )
        )
      ),

      deleteCurrency: rxMethod<RxMethodInputWithCallback<string | number>>(
        pipe(
          tap(() => patchState(store, setLoading('delete'))),
          exhaustMap((request) =>
            service.deleteCurrency(request.data).pipe(
              tapResponse({
                next: () => {
                  patchState(
                    store,
                    { currency: undefined },
                    setLoaded('delete')
                  );
                  toast.success('Currency deleted successfully');
                  request.callback();
                },
                error: (error) => {
                  patchState(store, setError(error, 'delete'));
                  toast.warning('Failed to delete currency');
                },
              })
            )
          )
        )
      ),

      getAllCurrencies: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading('getMany'))),
          switchMap(() =>
            service.getAllCurrencies().pipe(
              tapResponse({
                next: (currencies) => {
                  patchState(store, { currencies }, setLoaded('getMany'));
                },
                error: (error) => {
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

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
import { pipe, switchMap, tap } from 'rxjs';

import {
  type LowStockProduct,
  type ProductSales,
  type RecentTransaction,
} from './dashboard.model';
import { DashboardService } from './dashboard.service';

interface State {
  recentTransactions: RecentTransaction[];
  lowSelling: ProductSales[];
  topSelling: ProductSales[];
  lowStock: LowStockProduct[];
}

const initialState: State = {
  recentTransactions: [],
  lowSelling: [],
  topSelling: [],
  lowStock: [],
};

export const DashboardStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withDevtools('dashboard'),
  withReset(),
  withCallState({
    collections: ['recentTransactions', 'lowSelling', 'topSelling', 'lowStock'],
  }),

  withMethods((store, service = inject(DashboardService)) => ({
    getRecentTransactions: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setLoading('recentTransactions'))),
        switchMap(() =>
          service.getRecentTransactions().pipe(
            tapResponse({
              next: recentTransactions =>
                patchState(
                  store,
                  { recentTransactions },
                  setLoaded('recentTransactions')
                ),
              error: error =>
                patchState(store, setError(error, 'recentTransactions')),
            })
          )
        )
      )
    ),

    getLowSelling: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setLoading('lowSelling'))),
        switchMap(() =>
          service.getLowSelling().pipe(
            tapResponse({
              next: lowSelling =>
                patchState(store, { lowSelling }, setLoaded('lowSelling')),
              error: error => patchState(store, setError(error, 'lowSelling')),
            })
          )
        )
      )
    ),

    getTopSelling: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setLoading('topSelling'))),
        switchMap(() =>
          service.getTopSelling().pipe(
            tapResponse({
              next: topSelling =>
                patchState(store, { topSelling }, setLoaded('topSelling')),
              error: error => patchState(store, setError(error, 'topSelling')),
            })
          )
        )
      )
    ),

    getLowStock: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setLoading('lowStock'))),
        switchMap(() =>
          service.getLowStock().pipe(
            tapResponse({
              next: lowStock =>
                patchState(store, { lowStock }, setLoaded('lowStock')),
              error: error => patchState(store, setError(error, 'lowStock')),
            })
          )
        )
      )
    ),
  }))
);

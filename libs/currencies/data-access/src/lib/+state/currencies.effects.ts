import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Utilities } from '@pos-frontend/shared/utils';
import {
  switchMap,
  catchError,
  of,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { CurrenciesSelectors } from '../..';
import { CurrenciesService } from '../services/currencies.service';
import * as CurrenciesActions from './currencies.actions';
import * as CurrenciesFeature from './currencies.reducer';

@Injectable()
export class CurrenciesEffects {
  loadCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrenciesActions.getCurrencyById),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(
              select(CurrenciesSelectors.getSelected(action.currencyId))
            )
          )
        )
      ),
      switchMap(([action, cachedCurrency]) => {
        if (cachedCurrency)
          return of(
            CurrenciesActions.getCurrencyByIdSuccess({
              currency: cachedCurrency,
            })
          );

        return this.currenciesService.getCurrency(action.currencyId).pipe(
          map((currency) =>
            CurrenciesActions.getCurrencyByIdSuccess({ currency })
          ),
          catchError((error) =>
            of(CurrenciesActions.getCurrencyByIdFailure({ error }))
          )
        );
      })
    )
  );

  loadAllCurrencies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrenciesActions.getAllCurrencies),
      exhaustMap(() =>
        this.currenciesService.getAllCurrencies().pipe(
          map((currencies) =>
            CurrenciesActions.getAllCurrenciesSuccess({ currencies })
          ),
          catchError((error) =>
            of(CurrenciesActions.getAllCurrenciesFailure({ error }))
          )
        )
      )
    )
  );

  loadCurrencyList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrenciesActions.getPaginatedCurrencies),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(CurrenciesSelectors.getCurrentPageState))
          )
        )
      ),
      exhaustMap(([action, page]) =>
        this.currenciesService
          .getPaginatedCurrencies(
            Utilities.formatDatagridState(
              action.state,
              action.state.page
                ? action.state.page.from! / action.state.page.size!
                : page
            )
          )
          .pipe(
            map((currenciesObject) =>
              CurrenciesActions.getPaginatedCurrenciesSuccess({
                currencies: currenciesObject.content,
                total: currenciesObject.totalElements,
                page: currenciesObject.page,
              })
            ),
            catchError((error) =>
              of(CurrenciesActions.getPaginatedCurrenciesFailure({ error }))
            )
          )
      )
    )
  );

  createCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrenciesActions.createCurrency),
      mergeMap((action) =>
        this.currenciesService.createCurrency(action.currencyDetails).pipe(
          map((currency) => CurrenciesActions.createCurrenciesuccess(currency)),
          catchError((error) =>
            of(CurrenciesActions.createCurrencyFailure({ error }))
          )
        )
      )
    )
  );

  makeDefaulty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrenciesActions.makeDefault),
      mergeMap((action) =>
        this.currenciesService.makeDefaultCurrency(action.currencyDetails).pipe(
          map((currency) => CurrenciesActions.makeDefaultSuccess(currency)),
          catchError((error) =>
            of(CurrenciesActions.makeDefaultFailure({ error }))
          )
        )
      )
    )
  );

  updateCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrenciesActions.updateCurrency),
      mergeMap((action) =>
        this.currenciesService.updateCurrency(action.currencyDetails).pipe(
          map((currency) => CurrenciesActions.updateCurrenciesuccess(currency)),
          catchError((error) =>
            of(CurrenciesActions.updateCurrencyFailure({ error }))
          )
        )
      )
    )
  );

  updateRate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrenciesActions.updateRate),
      mergeMap((action) =>
        this.currenciesService.updateRate(action.currencyDetails).pipe(
          map((currency) =>
            CurrenciesActions.updateRateSuccess(currency)
          ),
          catchError((error) =>
            of(CurrenciesActions.updateRateFailure({ error }))
          )
        )
      )
    )
  );

  deleteCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrenciesActions.deleteCurrency),
      mergeMap((action) =>
        this.currenciesService.deleteCurrency(action.currencyId).pipe(
          map(() => CurrenciesActions.deleteCurrenciesuccess()),
          catchError((error) =>
            of(CurrenciesActions.deleteCurrencyFailure({ error }))
          )
        )
      )
    )
  );

  getDefaltCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrenciesActions.getDefaultCurrency),
      mergeMap((action) =>
        this.currenciesService.getDefaultCurrency().pipe(
          map((currency) =>
            CurrenciesActions.getDefaultCurrencySuccess({ currency })
          ),
          catchError((error) =>
            of(CurrenciesActions.getDefaultCurrencyFailure({ error }))
          )
        )
      )
    )
  );

  onSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CurrenciesActions.createCurrenciesuccess,
          CurrenciesActions.updateCurrenciesuccess,
          CurrenciesActions.deleteCurrenciesuccess,
          CurrenciesActions.makeDefaultSuccess
        ),
        tap(() => Utilities.displayToast('success'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private currenciesService: CurrenciesService,
    private store: Store<CurrenciesFeature.CurrenciesPartialState>
  ) {}
}

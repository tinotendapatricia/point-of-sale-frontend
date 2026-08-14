import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
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
import * as DebtorsActions from './debtors.actions';
import * as DebtorsFeature from './debtors.reducer';
import { select, Store } from '@ngrx/store';
import { DebtorsService } from '../services/debtors.service';
import { Utilities } from '@pos-frontend/shared/utils';
import * as DebtorsSelectors from './debtors.selectors';
@Injectable()
export class DebtorsEffects {
  loadDebtor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DebtorsActions.getDebtorById),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(
              select(DebtorsSelectors.getSelected(action.debtorId))
            )
          )
        )
      ),
      switchMap(([action, cachedDebtor]) => {
        if (cachedDebtor)
          return of(
            DebtorsActions.getDebtorByIdSuccess({
              debtor: cachedDebtor,
            })
          );

        return this.debtorsService.getDebtor(action.debtorId).pipe(
          map((debtor) => DebtorsActions.getDebtorByIdSuccess({ debtor })),
          catchError((error) =>
            of(DebtorsActions.getDebtorByIdFailure({ error }))
          )
        );
      })
    )
  );

  loadAllDebtors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DebtorsActions.getAllDebtors),
      exhaustMap(() =>
        this.debtorsService.getAllDebtors().pipe(
          map((debtors) => DebtorsActions.getAllDebtorsSuccess({ debtors })),
          catchError((error) =>
            of(DebtorsActions.getAllDebtorsFailure({ error }))
          )
        )
      )
    )
  );

  loadDebtorList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DebtorsActions.getPaginatedDebtors),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(DebtorsSelectors.getCurrentPageState))
          )
        )
      ),
      exhaustMap(([action, page]) =>
        this.debtorsService
          .getPaginatedDebtors(
            Utilities.formatDatagridState(
              action.state,
              action.state.page
                ? action.state.page.from! / action.state.page.size!
                : page
            )
          )
          .pipe(
            map((debtorsObject) =>
              DebtorsActions.getPaginatedDebtorsSuccess({
                debtors: debtorsObject.content,
                total: debtorsObject.totalElements,
                page: debtorsObject.page,
              })
            ),
            catchError((error) =>
              of(DebtorsActions.getPaginatedDebtorsFailure({ error }))
            )
          )
      )
    )
  );

  createDebtor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DebtorsActions.createDebtor),
      mergeMap((action) =>
        this.debtorsService.createDebtor(action.debtorDetails).pipe(
          map((debtor) => DebtorsActions.createDebtorSuccess(debtor)),
          catchError((error) =>
            of(DebtorsActions.createDebtorFailure({ error }))
          )
        )
      )
    )
  );

  updateDebtor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DebtorsActions.updateDebtor),
      mergeMap((action) =>
        this.debtorsService.updateDebtor(action.debtorDetails).pipe(
          map((debtor) => DebtorsActions.updateDebtorSuccess(debtor)),
          catchError((error) =>
            of(DebtorsActions.updateDebtorFailure({ error }))
          )
        )
      )
    )
  );

  assignDebtorRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DebtorsActions.assignDebtorRoles),
      mergeMap((action) =>
        this.debtorsService.assignDebtorRoles(action.debtorDetails).pipe(
          map((debtor) => DebtorsActions.assignDebtorRolesSuccess(debtor)),
          catchError((error) =>
            of(DebtorsActions.assignDebtorRolesFailure({ error }))
          )
        )
      )
    )
  );

  deleteDebtor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DebtorsActions.deleteDebtor),
      mergeMap((action) =>
        this.debtorsService.deleteDebtor(action.debtorId).pipe(
          map(() => DebtorsActions.deleteDebtorSuccess()),
          catchError((error) =>
            of(DebtorsActions.deleteDebtorFailure({ error }))
          )
        )
      )
    )
  );

  onSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          DebtorsActions.createDebtorSuccess,
          DebtorsActions.updateDebtorSuccess,
          DebtorsActions.deleteDebtorSuccess
        ),
        tap(() => Utilities.displayToast('success'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private debtorsService: DebtorsService,
    private store: Store<DebtorsFeature.DebtorsPartialState>
  ) {}
}

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
import * as CreditorsSelectors from './creditors.selectors';
import { CreditorsService } from '../services/creditors.service';
import * as CreditorsActions from './creditors.actions';
import * as CreditorsFeature from './creditors.reducer';

@Injectable()
export class CreditorsEffects {
  loadCreditor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreditorsActions.getCreditorById),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(
              select(CreditorsSelectors.getSelected(action.creditorId))
            )
          )
        )
      ),
      switchMap(([action, cachedCreditor]) => {
        if (cachedCreditor)
          return of(
            CreditorsActions.getCreditorByIdSuccess({
              creditor: cachedCreditor,
            })
          );

        return this.creditorsService.getCreditor(action.creditorId).pipe(
          map((creditor) =>
            CreditorsActions.getCreditorByIdSuccess({ creditor })
          ),
          catchError((error) =>
            of(CreditorsActions.getCreditorByIdFailure({ error }))
          )
        );
      })
    )
  );

  loadAllCreditors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreditorsActions.getAllCreditors),
      exhaustMap(() =>
        this.creditorsService.getAllCreditors().pipe(
          map((creditors) =>
            CreditorsActions.getAllCreditorsSuccess({ creditors })
          ),
          catchError((error) =>
            of(CreditorsActions.getAllCreditorsFailure({ error }))
          )
        )
      )
    )
  );

  loadCreditorList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreditorsActions.getPaginatedCreditors),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(CreditorsSelectors.getCurrentPageState))
          )
        )
      ),
      exhaustMap(([action, page]) =>
        this.creditorsService
          .getPaginatedCreditors(
            Utilities.formatDatagridState(
              action.state,
              action.state.page
                ? action.state.page.from! / action.state.page.size!
                : page
            )
          )
          .pipe(
            map((creditorsObject) =>
              CreditorsActions.getPaginatedCreditorsSuccess({
                creditors: creditorsObject.content,
                total: creditorsObject.totalElements,
                page: creditorsObject.page,
              })
            ),
            catchError((error) =>
              of(CreditorsActions.getPaginatedCreditorsFailure({ error }))
            )
          )
      )
    )
  );

  createCreditor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreditorsActions.createCreditor),
      mergeMap((action) =>
        this.creditorsService.createCreditor(action.creditorDetails).pipe(
          map((creditor) => CreditorsActions.createCreditorSuccess(creditor)),
          catchError((error) =>
            of(CreditorsActions.createCreditorFailure({ error }))
          )
        )
      )
    )
  );

  updateCreditor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreditorsActions.updateCreditor),
      mergeMap((action) =>
        this.creditorsService.updateCreditor(action.creditorDetails).pipe(
          map((creditor) => CreditorsActions.updateCreditorSuccess(creditor)),
          catchError((error) =>
            of(CreditorsActions.updateCreditorFailure({ error }))
          )
        )
      )
    )
  );

  assignCreditorRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreditorsActions.assignCreditorRoles),
      mergeMap((action) =>
        this.creditorsService.assignCreditorRoles(action.creditorDetails).pipe(
          map((creditor) =>
            CreditorsActions.assignCreditorRolesSuccess(creditor)
          ),
          catchError((error) =>
            of(CreditorsActions.assignCreditorRolesFailure({ error }))
          )
        )
      )
    )
  );

  deleteCreditor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreditorsActions.deleteCreditor),
      mergeMap((action) =>
        this.creditorsService.deleteCreditor(action.creditorId).pipe(
          map(() => CreditorsActions.deleteCreditorSuccess()),
          catchError((error) =>
            of(CreditorsActions.deleteCreditorFailure({ error }))
          )
        )
      )
    )
  );

  onSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CreditorsActions.createCreditorSuccess,
          CreditorsActions.updateCreditorSuccess,
          CreditorsActions.deleteCreditorSuccess
        ),
        tap(() => Utilities.displayToast('success'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private creditorsService: CreditorsService,
    private store: Store<CreditorsFeature.CreditorsPartialState>
  ) {}
}

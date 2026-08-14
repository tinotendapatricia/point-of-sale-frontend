import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Utilities } from '@pos-frontend/shared/utils';
import {
  switchMap,
  catchError,
  of,
  concatMap,
  map,
  mergeMap,
  tap,
  withLatestFrom,
  exhaustMap,
} from 'rxjs';
import { VatSelectors } from '../..';
import { VatService } from '../services/vat.service';
import * as VatActions from './vat.actions';
import * as VatFeature from './vat.reducer';

@Injectable()
export class VatEffects {
  /* loadVat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VatActions.getVatById),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(VatSelectors.getSelected(action.vatId)))
          )
        )
      ),
      switchMap(([action, cachedVat]) => {
        if (cachedVat)
          return of(
            VatActions.getVatByIdSuccess({
              vat: cachedVat,
            })
          );

        return this.vatService.getVat().pipe(
          map((vat) => VatActions.getVatByIdSuccess({ vat })),
          catchError((error) => of(VatActions.getVatByIdFailure({ error })))
        );
      })
    )
  );*/

  loadAllVat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VatActions.getVatById),
      exhaustMap(() =>
        this.vatService.getVat().pipe(
          map((vat) => VatActions.getVatByIdSuccess({ vat })),
          catchError((error) => of(VatActions.getVatByIdFailure({ error })))
        )
      )
    )
  );

  updateVat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VatActions.updateVat),
      mergeMap((action) =>
        this.vatService.updateVat(action.vatDetails).pipe(
          map((vat) => VatActions.updateVatuccess(vat)),
          catchError((error) => of(VatActions.updateVatFailure({ error })))
        )
      )
    )
  );

  onSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(VatActions.updateVatuccess),
        tap(() => Utilities.displayToast('success'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private vatService: VatService,
    private store: Store<VatFeature.VatPartialState>
  ) {}
}

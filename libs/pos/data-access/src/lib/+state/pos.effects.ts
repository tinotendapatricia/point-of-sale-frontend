import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, mergeMap, tap } from 'rxjs';
import * as PosActions from './pos.actions';
import * as PosFeature from './pos.reducer';
import { PosService } from '../services/pos.service';
import { Store } from '@ngrx/store';
import { Utilities } from '@pos-frontend/shared/utils';

@Injectable()
export class PosEffects {
  createPos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PosActions.createPos),
      mergeMap((action) =>
        this.posService.createPos(action.posDetails).pipe(
          map((pos) => PosActions.createPosuccess(pos)),
          catchError((error) => of(PosActions.createPosFailure({ error })))
        )
      )
    )
  );
  onSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          PosActions.createPosuccess
         
        ),
        tap(() => Utilities.displayToast('success'))
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private posService: PosService,
    private store: Store<PosFeature.PosPartialState>
  ) {}
}

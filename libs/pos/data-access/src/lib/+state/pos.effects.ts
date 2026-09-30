import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, map, mergeMap, tap } from 'rxjs';
import { ToastService } from '@pos-frontend/core';
import * as PosActions from './pos.actions';
import { PosService } from '../services/pos.service';

@Injectable()
export class PosEffects {
  private readonly actions$ = inject(Actions);
  private readonly posService = inject(PosService);
  private readonly toast = inject(ToastService);

  readonly createPos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PosActions.createPos),
      mergeMap((action) =>
        this.posService.createPos(action.posDetails).pipe(
          map((pos) => PosActions.createPosuccess(pos)),
          catchError((error: Error) =>
            of(PosActions.createPosFailure({ error }))
          )
        )
      )
    )
  );

  readonly onSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PosActions.createPosuccess),
        tap(() => this.toast.success())
      ),
    { dispatch: false }
  );
}

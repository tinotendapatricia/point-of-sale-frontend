import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, exhaustMap, concatMap, map, withLatestFrom } from 'rxjs';
import * as AuditsActions from './audits.actions';
import * as AuditsFeature from './audits.reducer';
import { AuditsService } from '../services/audits.service';
import { Store, select } from '@ngrx/store';
import { Utilities } from '@pos-frontend/shared/utils';
import { AuditsSelectors } from '../..';

@Injectable()
export class AuditsEffects {
  private actions$ = inject(Actions);

  loadAuditList$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuditsActions.getPaginatedAudits),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(
          this.store.pipe(select(AuditsSelectors.getCurrentPageState))
        )
      )
    ),
    exhaustMap(([action, page]) =>
      this.auditsService
        .getPaginatedAudits(
          Utilities.formatDatagridState(
            action.state,
            action.state.page
              ? action.state.page.from! / action.state.page.size!
              : page
          )
        )
        .pipe(
          map((AuditsObject) =>
            AuditsActions.getPaginatedAuditsSuccess({
              audits: AuditsObject.content,
              total: AuditsObject.totalElements,
              page: AuditsObject.page,
            })
          ),
          catchError((error) =>
            of(AuditsActions.getPaginatedAuditsFailure({ error }))
          )
        )
    )
  )
);

constructor(
  //private actions$: Actions,
  private auditsService: AuditsService,
  private store: Store<AuditsFeature.AuditsPartialState>
) {}
}

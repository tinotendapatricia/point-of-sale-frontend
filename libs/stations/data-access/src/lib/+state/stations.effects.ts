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
import * as StationsActions from './stations.actions';
import * as StationsFeature from './stations.reducer';
import { select, Store } from '@ngrx/store';
import { Utilities } from '@pos-frontend/shared/utils';
import * as StationsSelectors from './stations.selectors';
import { StationsService } from '../services/stations.service';

@Injectable()
export class StationsEffects {
  loadStation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StationsActions.getStationById),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(
              select(StationsSelectors.getSelected(action.stationId))
            )
          )
        )
      ),
      switchMap(([action, cachedStation]) => {
        if (cachedStation)
          return of(
            StationsActions.getStationByIdSuccess({
              station: cachedStation,
            })
          );

        return this.stationsService.getStation(action.stationId).pipe(
          map((station) => StationsActions.getStationByIdSuccess({ station })),
          catchError((error) =>
            of(StationsActions.getStationByIdFailure({ error }))
          )
        );
      })
    )
  );

  loadAllStations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StationsActions.getAllStations),
      exhaustMap(() =>
        this.stationsService.getAllStations().pipe(
          map((stations) =>
            StationsActions.getAllStationsSuccess({ stations })
          ),
          catchError((error) =>
            of(StationsActions.getAllStationsFailure({ error }))
          )
        )
      )
    )
  );

  loadStationList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StationsActions.getPaginatedStations),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(StationsSelectors.getCurrentPageState))
          )
        )
      ),
      exhaustMap(([action, page]) =>
        this.stationsService
          .getPaginatedStations(
            Utilities.formatDatagridState(
              action.state,
              action.state.page
                ? action.state.page.from! / action.state.page.size!
                : page
            )
          )
          .pipe(
            map((stationsObject) =>
              StationsActions.getPaginatedStationsSuccess({
                stations: stationsObject.content,
                total: stationsObject.totalElements,
                page: stationsObject.page,
              })
            ),
            catchError((error) =>
              of(StationsActions.getPaginatedStationsFailure({ error }))
            )
          )
      )
    )
  );

  createStation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StationsActions.createStation),
      mergeMap((action) =>
        this.stationsService.createStation(action.stationDetails).pipe(
          map((station) => StationsActions.createStationSuccess(station)),
          catchError((error) =>
            of(StationsActions.createStationFailure({ error }))
          )
        )
      )
    )
  );

  updateStation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StationsActions.updateStation),
      mergeMap((action) =>
        this.stationsService.updateStation(action.stationDetails).pipe(
          map((station) => StationsActions.updateStationSuccess(station)),
          catchError((error) =>
            of(StationsActions.updateStationFailure({ error }))
          )
        )
      )
    )
  );

  assignStationRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StationsActions.assignStationRoles),
      mergeMap((action) =>
        this.stationsService.assignStationRoles(action.stationDetails).pipe(
          map((station) => StationsActions.assignStationRolesSuccess(station)),
          catchError((error) =>
            of(StationsActions.assignStationRolesFailure({ error }))
          )
        )
      )
    )
  );

  deleteStation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StationsActions.deleteStation),
      mergeMap((action) =>
        this.stationsService.deleteStation(action.stationId).pipe(
          map(() => StationsActions.deleteStationSuccess()),
          catchError((error) =>
            of(StationsActions.deleteStationFailure({ error }))
          )
        )
      )
    )
  );

  onSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          StationsActions.createStationSuccess,
          StationsActions.updateStationSuccess,
          StationsActions.deleteStationSuccess
        ),
        tap(() => Utilities.displayToast('success'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private stationsService: StationsService,
    private store: Store<StationsFeature.StationsPartialState>
  ) {}
}

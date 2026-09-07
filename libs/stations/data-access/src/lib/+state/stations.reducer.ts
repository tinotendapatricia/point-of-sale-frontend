import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as StationsActions from './stations.actions';
import { StationsEntity } from './stations.models';
import { LoadingState } from '@pos-frontend/shared/utils';

export const STATIONS_FEATURE_KEY = 'stations';

export interface StationsState extends EntityState<StationsEntity> {
  selectedId?: string | number;
  loaded?: boolean;
  loading: boolean;
  error?: Error;
  selectedStation: StationsEntity | undefined;
  total: number;
  btnState: LoadingState;
  currentPage: number;
}

export interface StationsPartialState {
  readonly [STATIONS_FEATURE_KEY]: StationsState;
}

export const stationsAdapter: EntityAdapter<StationsEntity> =
  createEntityAdapter<StationsEntity>();

export const initialStationsState: StationsState =
  stationsAdapter.getInitialState({
    loaded: false,
    loading: false,
    error: undefined,
    selectedStation: undefined,
    total: 0,
    btnState: LoadingState.DEFAULT,
    currentPage: 0,
  });

const reducer = createReducer(
  initialStationsState,
  on(
    StationsActions.getStationById,
    StationsActions.getPaginatedStations,
    StationsActions.getAllStations,
    (state) => ({
      ...state,
      loading: true,
    })
  ),

  on(StationsActions.getStationByIdSuccess, (state, { station }) => ({
    ...state,
    loading: false,
    loaded: true,
    selectedStation: station,
  })),

  on(StationsActions.getAllStationsSuccess, (state, { stations }) =>
    stationsAdapter.setAll(stations, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),

  on(
    StationsActions.getPaginatedStationsSuccess,
    (state, { stations, total, page }) =>
      stationsAdapter.setAll(stations, {
        ...state,
        loading: false,
        loaded: true,
        total: total,
        currentPage: page,
      })
  ),

  on(
    StationsActions.getAllStationsFailure,
    StationsActions.getStationByIdFailure,
    StationsActions.getPaginatedStationsFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error,
    })
  ),

  on(
    StationsActions.createStation,
    StationsActions.updateStation,
    StationsActions.deleteStation,
    StationsActions.assignStationRoles,
    (state) => ({
      ...state,
      btnState: LoadingState.LOADING,
      loaded: false,
      error: undefined,
    })
  ),

  on(
    StationsActions.createStationSuccess,
    StationsActions.updateStationSuccess,
    StationsActions.deleteStationSuccess,
    StationsActions.assignStationRolesSuccess,
    (state) => ({
      ...state,
      loaded: true,
      btnState: LoadingState.SUCCESS,
    })
  ),

  on(
    StationsActions.createStationFailure,
    StationsActions.updateStationFailure,
    StationsActions.deleteStationFailure,
    StationsActions.assignStationRolesFailure,
    (state, { error }) => ({
      ...state,
      error: error,
      btnState: LoadingState.ERROR,
    })
  )
);

export function stationsReducer(
  state: StationsState | undefined,
  action: Action
) {
  return reducer(state, action);
}

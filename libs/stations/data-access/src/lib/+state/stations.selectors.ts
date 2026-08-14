import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  STATIONS_FEATURE_KEY,
  StationsState,
  stationsAdapter,
} from './stations.reducer';

// Lookup the 'Stations' feature state managed by NgRx
export const selectStationsState =
  createFeatureSelector<StationsState>(STATIONS_FEATURE_KEY);

const { selectAll, selectEntities } = stationsAdapter.getSelectors();

export const selectStationsLoaded = createSelector(
  selectStationsState,
  (state: StationsState) => state.loaded
);

export const selectStationsError = createSelector(
  selectStationsState,
  (state: StationsState) => state.error
);

export const selectAllStations = createSelector(
  selectStationsState,
  (state: StationsState) => selectAll(state)
);

export const selectStationsEntities = createSelector(
  selectStationsState,
  (state: StationsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectStationsState,
  (state: StationsState) => state.selectedId
);

export const getSelected = (stationId: string | number) =>
  createSelector(selectStationsEntities, (entities) => entities[stationId]);

export const getSelectedStation = createSelector(
  selectStationsState,
  (state: StationsState) => state.selectedStation
);

export const getTotalStations = createSelector(
  selectStationsState,
  (state: StationsState) => state.total
);

export const getCurrentPageState = createSelector(
  selectStationsState,
  (state: StationsState) => state.currentPage
);

export const getStationsLoadingState = createSelector(
  selectStationsState,
  (state: StationsState) => state.loading
);

export const getBtnState = createSelector(
  selectStationsState,
  (state: StationsState) => state.btnState
);

import { createAction, props } from '@ngrx/store';
import { StationsEntity } from './stations.models';
import { ClrDatagridStateInterface } from '@clr/angular';

export const getPaginatedStations = createAction(
  '[Stations] Get Paginated Stations',
  props<{ state: ClrDatagridStateInterface }>()
);

export const getPaginatedStationsSuccess = createAction(
  '[Stations] Get Paginated Stations Success',
  props<{ stations: StationsEntity[]; total: number; page: number }>()
);

export const getPaginatedStationsFailure = createAction(
  '[Stations] Get Paginated Stations Failure',
  props<{ error: Error }>()
);

export const getAllStations = createAction('[Stations] Get All Stations');

export const getAllStationsSuccess = createAction(
  '[Stations] Get All Stations Success',
  props<{ stations: StationsEntity[] }>()
);

export const getAllStationsFailure = createAction(
  '[Stations] Get All Stations Failure',
  props<{ error: Error }>()
);

export const getStationById = createAction(
  '[Stations] Get Station',
  props<{ stationId: string | number }>()
);

export const getStationByIdSuccess = createAction(
  '[Stations] Get Station Success',
  props<{ station: StationsEntity }>()
);

export const getStationByIdFailure = createAction(
  '[Stations] Get Station Failure',
  props<{ error: any }>()
);

export const createStation = createAction(
  '[Stations] Create Station',
  (stationDetails: StationsEntity) => ({ stationDetails })
);

export const createStationSuccess = createAction(
  '[Stations] Create Station Success',
  (stationDetails: StationsEntity) => ({ stationDetails })
);

export const createStationFailure = createAction(
  '[Stations] Create Station Failure',
  props<{ error: Error }>()
);

export const deleteStation = createAction(
  '[Stations] Delete Station',
  props<{ stationId: string | number }>()
);

export const deleteStationSuccess = createAction(
  '[Stations] Delete Station Success'
);

export const deleteStationFailure = createAction(
  '[Stations] Delete Station Failure',
  props<{ error: Error }>()
);

export const updateStation = createAction(
  '[Stations] Update Station',
  (stationDetails: StationsEntity) => ({ stationDetails })
);

export const updateStationSuccess = createAction(
  '[Stations] Update Station Success',
  (stationDetails: StationsEntity) => ({ stationDetails })
);

export const updateStationFailure = createAction(
  '[Stations] Update Station Failure',
  props<{ error: Error }>()
);

export const assignStationRoles = createAction(
  '[Stations] Assign Station Roles',
  (stationDetails: StationsEntity) => ({ stationDetails })
);

export const assignStationRolesSuccess = createAction(
  '[Stations] Assign Station Roles Success',
  (stationDetails: StationsEntity) => ({ stationDetails })
);

export const assignStationRolesFailure = createAction(
  '[Stations] Assign Station Roles Failure',
  props<{ error: Error }>()
);

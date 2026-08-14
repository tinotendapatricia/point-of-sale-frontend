import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as StationsActions from './stations.actions';
import * as StationsFeature from './stations.reducer';
import * as StationsSelectors from './stations.selectors';
import { ClrDatagridStateInterface } from '@clr/angular';
import { StationsEntity } from './stations.models';

@Injectable()
export class StationsFacade {
  loaded$ = this.store.pipe(select(StationsSelectors.selectStationsLoaded));
  allStations$ = this.store.pipe(select(StationsSelectors.selectAllStations));
  selectedStation$ = this.store.pipe(
    select(StationsSelectors.getSelectedStation)
  );
  loading$ = this.store.pipe(select(StationsSelectors.getStationsLoadingState));
  totalStations$ = this.store.pipe(select(StationsSelectors.getTotalStations));
  btnState$ = this.store.pipe(select(StationsSelectors.getBtnState));

  constructor(private store: Store<StationsFeature.StationsPartialState>) {}

  getPaginatedStations(state: ClrDatagridStateInterface) {
    this.store.dispatch(StationsActions.getPaginatedStations({ state }));
  }

  getAllStations() {
    this.store.dispatch(StationsActions.getAllStations());
  }

  getStation(stationId: string | number) {
    this.store.dispatch(StationsActions.getStationById({ stationId }));
  }

  createNewStation(station: StationsEntity) {
    this.store.dispatch(StationsActions.createStation(station));
  }

  updateStation(station: StationsEntity) {
    this.store.dispatch(StationsActions.updateStation(station));
  }

  assignStationRoles(stationDetails: any) {
    this.store.dispatch(StationsActions.assignStationRoles(stationDetails));
  }
}

import { EnvironmentProviders, Provider } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromStations from './+state/stations.reducer';
import { StationsEffects } from './+state/stations.effects';
import { StationsFacade } from './+state/stations.facade';

export function provideStationsDataAccess(): (Provider | EnvironmentProviders)[] {
  return [
    provideState(fromStations.STATIONS_FEATURE_KEY, fromStations.stationsReducer),
    provideEffects(StationsEffects),
    StationsFacade,
  ];
}

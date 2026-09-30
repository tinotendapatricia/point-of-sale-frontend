import { type Routes } from '@angular/router';
import { CreateStationComponent } from './create-station/create-station.component';
import { StationsListComponent } from './stations-list/stations-list.component';
import { UpdateStationComponent } from './update-station/update-station.component';

// StationStore is root-provided, so no route-level providers are needed.
export const ADMIN_FEATURE_STATIONS_ROUTES: Routes = [
  { path: '', component: StationsListComponent },
  { path: 'new', component: CreateStationComponent },
  { path: 'update/:stationId', component: UpdateStationComponent },
];

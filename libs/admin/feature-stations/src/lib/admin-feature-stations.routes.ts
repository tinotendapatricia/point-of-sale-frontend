import { type Routes } from '@angular/router';
import { StationsListComponent } from './stations-list/stations-list.component';

// StationStore is root-provided, so no route-level providers are needed.
export const ADMIN_FEATURE_STATIONS_ROUTES: Routes = [
  { path: '', component: StationsListComponent },
];

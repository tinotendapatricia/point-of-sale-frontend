import { Routes } from '@angular/router';
import { StationsListComponent } from './stations-list/stations-list.component';
import { provideStationsDataAccess } from '@pos-frontend/stations/data-access';

export const ADMIN_FEATURE_STATIONS_ROUTES: Routes = [
  {
    path: '',
    component: StationsListComponent,
    providers: [provideStationsDataAccess()],
  },
];

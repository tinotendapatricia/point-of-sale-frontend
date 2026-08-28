import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationsListComponent } from './stations-list/stations-list.component';
import { UpdateStationComponent } from './update-station/update-station.component';
import { CreateStationComponent } from './create-station/create-station.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { StationsDataAccessModule } from '@pos-frontend/stations/data-access';
import { StationsUiModule } from '@pos-frontend/stations/ui';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        StationsDataAccessModule,
        StationsUiModule,
        ClarityModule,
        MatCardModule,
        ReactiveFormsModule,
        RouterModule.forChild([{ path: '', component: StationsListComponent }]),
        StationsListComponent,
        UpdateStationComponent,
        CreateStationComponent,
    ],
})
export class AdminFeatureStationsModule {}

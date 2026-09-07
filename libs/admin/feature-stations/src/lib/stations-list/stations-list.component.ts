import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatagridState } from '@pos-frontend/shared/utils';
import {
  StationsEntity,
  StationsFacade,
} from '@pos-frontend/stations/data-access';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { StationsListUiComponent } from '@pos-frontend/stations/ui';
import { CreateStationComponent } from '../create-station/create-station.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-stations-list',
    templateUrl: './stations-list.component.html',
    styleUrls: ['./stations-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, MatIconModule, StationsListUiComponent, AsyncPipe]
})
export class StationsListComponent {
  private readonly dialog = inject(MatDialog);

  constructor(
    public stationsFacade: StationsFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public getStationList(state: DatagridState) {
    this.stationsFacade.getPaginatedStations(state);
  }

  refresh() {
    this.getStationList({});
  }

  createStation() {
    this.dialog
      .open(CreateStationComponent, { width: '480px' })
      .afterClosed()
      .subscribe((created) => created && this.refresh());
  }

  updateStation(station: StationsEntity) {
    this.router.navigate(['./update-station', station.id], {
      relativeTo: this.route,
    });
  }

  viewStation(station: StationsEntity) {
    this.router.navigate(['./station-details', station.id], {
      relativeTo: this.route,
    });
  }

  viewStationAuthorities(stationId: any) {
    this.router.navigate(['./view-station', stationId], {
      relativeTo: this.route,
    });
  }
}

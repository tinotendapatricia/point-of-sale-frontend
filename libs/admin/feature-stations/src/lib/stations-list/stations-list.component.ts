import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import {
  StationsEntity,
  StationsFacade,
} from '@pos-frontend/stations/data-access';

@Component({
    selector: 'pos-frontend-stations-list',
    templateUrl: './stations-list.component.html',
    styleUrls: ['./stations-list.component.scss'],
    standalone: false
})
export class StationsListComponent implements AfterViewChecked {
  public isUpdate = false;
  public isCreate = false;
  public isChangeStatus = false;
  public selectedStation!: StationsEntity;

  constructor(
    public stationsFacade: StationsFacade,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  public getStationList(state: ClrDatagridStateInterface) {
    this.stationsFacade.getPaginatedStations(state);
  }

  refresh() {
    this.isUpdate = false;
    this.isCreate = false;
    this.isChangeStatus = false;
    this.getStationList({});
  }

  updateStation(station: StationsEntity) {
    this.selectedStation = station;
    this.isUpdate = true;
  }

  viewStation(station: StationsEntity) {
    this.router.navigate(['./station-details', station.id], {
      relativeTo: this.route,
    });
  }

  changeStationstatus(station: StationsEntity) {
    this.selectedStation = station;
    this.isChangeStatus = true;
  }

  viewStationAuthorities(stationId: any) {
    this.router.navigate(['./view-station', stationId], {
      relativeTo: this.route,
    });
  }
}

import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { StationsFacade } from '@pos-frontend/stations/data-access';
import { StationsFormComponent } from '@pos-frontend/stations/ui';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-create-station',
    templateUrl: './create-station.component.html',
    styleUrls: ['./create-station.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [StationsFormComponent, AsyncPipe]
})
export class CreateStationComponent {
  @Output() closeModal = new EventEmitter();
  constructor(public stationsService: StationsFacade, private router: Router) {}

  ngOnInit(): void {
    // this.stationsFacade.getAllStations();
  }

  public createStation(station: any) {
    this.stationsService.createNewStation(station);
    this.stationsService.loaded$.subscribe((res) => {
      res ? this.router.navigate(['/stations']) : null;
    });
  }
}

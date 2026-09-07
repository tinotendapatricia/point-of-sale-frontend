import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { StationsFacade } from '@pos-frontend/stations/data-access';
import { StationsFormComponent } from '@pos-frontend/stations/ui';

@Component({
    selector: 'pos-frontend-create-station',
    templateUrl: './create-station.component.html',
    styleUrls: ['./create-station.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [StationsFormComponent]
})
export class CreateStationComponent {
  private readonly dialogRef = inject(MatDialogRef<CreateStationComponent, boolean>);
  readonly stationsService = inject(StationsFacade);

  readonly submitting = signal(false);

  public createStation(station: any) {
    this.submitting.set(true);
    this.stationsService.createNewStation(station);
    this.stationsService.loaded$.pipe(take(1)).subscribe((loaded) => {
      this.submitting.set(false);
      if (loaded) {
        this.dialogRef.close(true);
      }
    });
  }
}

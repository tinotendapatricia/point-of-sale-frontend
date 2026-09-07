import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfigurationsService } from '@pos-frontend/configurations/data-access';
import { Utilities } from '@pos-frontend/shared/utils';
import { StationFormComponent } from '@pos-frontend/auth/ui';

@Component({
    selector: 'pos-frontend-configure-station',
    templateUrl: './configure-station.component.html',
    styleUrls: ['./configure-station.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [StationFormComponent]
})
export class ConfigureStationComponent {
  private readonly dialogRef = inject(MatDialogRef<ConfigureStationComponent, boolean>);
  private readonly configService = inject(ConfigurationsService);

  readonly submitting = signal(false);

  setStation(stationDetails: any) {
    this.submitting.set(true);
    this.configService.getAllConfigurations().subscribe({
      next: (res) => {
        this.submitting.set(false);
        const station = res.findIndex(
          (station) => station.stationNumber == stationDetails.stationNumber
        );

        if (station >= 0) {
          localStorage.setItem('station', res[station].stationNumber.toString());
          Utilities.displayToast('success', 'Station Set Successfully');
          this.dialogRef.close(true);
        } else {
          Utilities.displayToast('error', 'Station Number Invalid');
        }
      },
      error: () => {
        this.submitting.set(false);
      },
    });
  }
}

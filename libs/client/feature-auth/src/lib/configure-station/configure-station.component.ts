import { Component, EventEmitter, Output } from '@angular/core';
import { ConfigurationsService } from '@pos-frontend/configurations/data-access';
import { Utilities } from '@pos-frontend/shared/utils';
import { config } from 'rxjs';

@Component({
  selector: 'pos-frontend-configure-station',
  templateUrl: './configure-station.component.html',
  styleUrls: ['./configure-station.component.scss'],
})
export class ConfigureStationComponent {
  @Output() closeModal = new EventEmitter();
  constructor(public configService: ConfigurationsService) {}

  setStation(stationDetails: any) {
    this.configService.getAllConfigurations().subscribe({
      next: (res) => {
        const station = res.findIndex(
          (station) => (station.stationNumber == stationDetails.stationNumber)
        );
  
        if (station >= 0) {
         
          localStorage.setItem('station', res[station].stationNumber.toString());
          Utilities.displayToast('success', 'Station Set Successfully');
          this.closeModal.emit(true);
        } else {
          //localStorage.clear()
          Utilities.displayToast('error', 'Station Number Invalid');
        }
      },
      error: () => {},
    });
  }
}

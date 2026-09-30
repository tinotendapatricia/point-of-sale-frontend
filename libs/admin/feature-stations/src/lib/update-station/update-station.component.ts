import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { StationStore } from '@pos-frontend/stations/data-access';
import { type StationFormValue, StationsFormComponent } from '@pos-frontend/stations/ui';

@Component({
  selector: 'pos-frontend-update-station',
  templateUrl: './update-station.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCard, MatCardContent, StationsFormComponent],
})
export class UpdateStationComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly stationStore = inject(StationStore);

  protected readonly submitting = this.stationStore.updateLoading;

  constructor() {
    const id = this.route.snapshot.paramMap.get('stationId');
    if (id) {
      this.stationStore.getStation({ id });
    }
  }

  protected update(value: StationFormValue): void {
    const current = this.stationStore.station();
    if (!current) {
      return;
    }
    this.stationStore.updateStation({
      data: { ...value, id: current.id },
      callback: () => void this.router.navigate(['/stations']),
    });
  }

  protected cancel(): void {
    void this.router.navigate(['/stations']);
  }
}

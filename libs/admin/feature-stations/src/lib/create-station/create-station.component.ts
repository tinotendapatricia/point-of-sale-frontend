import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { injectDrawerRef } from '@pos-frontend/core';
import { StationStore } from '@pos-frontend/stations/data-access';
import { type StationFormValue, StationsFormComponent } from '@pos-frontend/stations/ui';

@Component({
  selector: 'pos-frontend-create-station',
  templateUrl: './create-station.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StationsFormComponent],
})
export class CreateStationComponent {
  private readonly router = inject(Router);
  // null on the routed /stations/new page; present when opened through DrawerService.
  private readonly drawerRef = injectDrawerRef<boolean>({ optional: true });
  private readonly stationStore = inject(StationStore);

  protected readonly submitting = this.stationStore.createLoading;

  protected create(value: StationFormValue): void {
    this.stationStore.createStation({ data: value, callback: () => this.close(true) });
  }

  protected close(created: boolean): void {
    if (this.drawerRef) {
      this.drawerRef.close(created);
    } else {
      void this.router.navigate(['/stations']);
    }
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialogRef } from '@angular/material/dialog';
import {
  StationFormComponent,
  type StationFormValue,
} from '@pos-frontend/auth/ui';
import { ConfigurationService } from '@pos-frontend/configurations/data-access';
import { ToastService } from '@pos-frontend/core';
import { setStationNumber } from '@pos-frontend/pos/data-access';

/** Dialog that stores this till's station number once it matches a configuration. */
@Component({
  selector: 'pos-frontend-configure-station',
  templateUrl: './configure-station.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StationFormComponent],
})
export class ConfigureStationComponent {
  private readonly dialogRef = inject<
    MatDialogRef<ConfigureStationComponent, boolean>
  >(MatDialogRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly configService = inject(ConfigurationService);
  private readonly toast = inject(ToastService);

  protected readonly submitting = signal(false);

  protected setStation({ stationNumber }: StationFormValue): void {
    this.submitting.set(true);
    this.configService
      .getAllConfigurations()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (configurations) => {
          this.submitting.set(false);
          const station = configurations.find(
            (config) => Number(config.stationNumber) === Number(stationNumber)
          );
          if (station) {
            setStationNumber(station.stationNumber);
            this.toast.success('Station Set Successfully');
            this.dialogRef.close(true);
          } else {
            this.toast.error('Station Number Invalid');
          }
        },
        error: () => this.submitting.set(false),
      });
  }
}

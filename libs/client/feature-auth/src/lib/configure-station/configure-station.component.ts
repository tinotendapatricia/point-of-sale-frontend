import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfigurationStore } from '@pos-frontend/configurations/data-access';
import { ToastService } from '@pos-frontend/core';
import { setStationNumber } from '@pos-frontend/pos/data-access';
import { DialogHeaderComponent } from '@pos-frontend/shared/ui';

/** Dialog that stores this till's station number once it matches a configuration. */
@Component({
  selector: 'pos-frontend-configure-station',
  templateUrl: './configure-station.component.html',
  styleUrl: './configure-station.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    DialogHeaderComponent,
  ],
})
export class ConfigureStationComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef = inject<
    MatDialogRef<ConfigureStationComponent, boolean>
  >(MatDialogRef);
  private readonly toast = inject(ToastService);
  private readonly configurationStore = inject(ConfigurationStore);

  protected readonly loading = this.configurationStore.getManyLoading;

  protected readonly form = this.fb.group({
    stationNumber: this.fb.control<number | null>(null, Validators.required),
  });

  protected cancel(): void {
    this.dialogRef.close(false);
  }

  protected submit(): void {
    const { stationNumber } = this.form.getRawValue();
    if (this.form.invalid || stationNumber === null) {
      this.form.markAllAsTouched();
      return;
    }

    const station = this.configurationStore
      .configurations()
      .find((config) => Number(config.stationNumber) === Number(stationNumber));
    if (!station) {
      this.toast.error('No station is configured with that number');
      return;
    }
    setStationNumber(station.stationNumber);
    this.toast.success('Station set successfully');
    this.dialogRef.close(true);
  }
}

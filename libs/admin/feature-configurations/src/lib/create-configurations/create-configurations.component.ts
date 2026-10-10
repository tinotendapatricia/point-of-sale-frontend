import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  type ConfigurationsEntity,
  ConfigurationStore,
} from '@pos-frontend/configurations/data-access';
import { DialogHeaderComponent } from '@pos-frontend/shared/ui';

export interface CreateConfigurationsData {
  /** Present when editing an existing configuration; omit to create a new one. */
  configuration?: ConfigurationsEntity;
}

/** Create/update dialog: opened through MatDialog from the configurations list. */
@Component({
  selector: 'pos-frontend-create-configurations',
  templateUrl: './create-configurations.component.html',
  styleUrl: './create-configurations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    DialogHeaderComponent,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
})
export class CreateConfigurationsComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef =
    inject<MatDialogRef<CreateConfigurationsComponent, boolean>>(MatDialogRef);
  private readonly data = inject<CreateConfigurationsData | null>(
    MAT_DIALOG_DATA,
    { optional: true }
  );
  private readonly configurationStore = inject(ConfigurationStore);

  protected readonly configuration = this.data?.configuration;
  protected readonly title = this.configuration
    ? 'Update Configuration'
    : 'New Configuration';
  protected readonly submitLabel = this.configuration ? 'Update' : 'Create';
  protected readonly loading = computed(() =>
    this.configuration
      ? this.configurationStore.updateLoading()
      : this.configurationStore.createLoading()
  );

  protected readonly form = this.fb.group({
    stationName: [this.configuration?.stationName ?? '', Validators.required],
    stationNumber: [
      this.configuration?.stationNumber ?? 50,
      [Validators.required, Validators.min(50)],
    ],
    printerName: [this.configuration?.printerName ?? '', Validators.required],
    copies: [
      this.configuration?.copies ?? 1,
      [Validators.required, Validators.min(1)],
    ],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const callback = () => this.dialogRef.close(true);

    if (this.configuration) {
      this.configurationStore.updateConfiguration({
        data: { ...value, id: this.configuration.id },
        callback,
      });
    } else {
      this.configurationStore.createConfiguration({ data: value, callback });
    }
  }
}

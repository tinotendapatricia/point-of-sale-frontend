import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { type StationsEntity, StationStore } from '@pos-frontend/stations/data-access';
import { DialogHeaderComponent } from '@pos-frontend/shared/ui';

export interface CreateStationData {
  /** Present when editing an existing station; omit to create a new one. */
  station?: StationsEntity;
}

/** Create/update dialog: opened through MatDialog from the stations list. */
@Component({
  selector: 'pos-frontend-create-station',
  templateUrl: './create-station.component.html',
  styleUrl: './create-station.component.scss',
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
export class CreateStationComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef = inject<MatDialogRef<CreateStationComponent, boolean>>(MatDialogRef);
  private readonly data = inject<CreateStationData | null>(MAT_DIALOG_DATA, { optional: true });
  private readonly stationStore = inject(StationStore);

  protected readonly station = this.data?.station;
  protected readonly title = this.station ? 'Update Station' : 'New Station';
  protected readonly submitLabel = this.station ? 'Update' : 'Create';
  protected readonly loading = computed(() =>
    this.station ? this.stationStore.updateLoading() : this.stationStore.createLoading(),
  );

  // The entity only carries number/name, so address and contact start empty on edit.
  protected readonly form = this.fb.group({
    account: [this.station ? String(this.station.number) : '', Validators.required],
    name: [this.station?.name ?? '', Validators.required],
    address: [''],
    contact: [''],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const callback = () => this.dialogRef.close(true);

    if (this.station) {
      this.stationStore.updateStation({ data: { ...value, id: this.station.id }, callback });
    } else {
      this.stationStore.createStation({ data: value, callback });
    }
  }
}

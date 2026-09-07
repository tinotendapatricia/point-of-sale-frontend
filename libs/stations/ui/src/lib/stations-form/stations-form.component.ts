import { Component, ChangeDetectionStrategy, inject, input, output, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StationsEntity } from '@pos-frontend/stations/data-access';

@Component({
    selector: 'pos-frontend-stations-form',
    templateUrl: './stations-form.component.html',
    styleUrls: ['./stations-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule]
})
export class StationsFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<unknown>, { optional: true });

  readonly station = input<StationsEntity>();
  readonly loading = input(false);
  readonly title = input('');
  readonly btnTitle = input('Submit');
  readonly formValue = output<any>();

  readonly stationForm = this.formBuilder.group({
    name: [''],
    account: [''],
    address: [''],
    contact: [''],
    id: [''],
  });

  constructor() {
    effect(() => {
      const station = this.station();
      if (station) {
        this.stationForm.patchValue({ ...station, id: String(station.id) });
      }
    });
  }

  cancel() {
    this.dialogRef?.close(false);
  }

  submit() {
    this.formValue.emit(this.stationForm.value);
  }
}

import { Component, ChangeDetectionStrategy, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'pos-frontend-station-form',
    templateUrl: './station-form.component.html',
    styleUrls: ['./station-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule]
})
export class StationFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<unknown>, { optional: true });

  readonly title = input('');
  readonly loading = input(false);
  readonly btnTitle = input('Set Station');
  readonly formValue = output<unknown>();

  readonly stationForm = this.formBuilder.group({
    stationNumber: [''],
  });

  cancel() {
    this.dialogRef?.close(false);
  }

  submit() {
    this.formValue.emit(this.stationForm.value);
  }
}

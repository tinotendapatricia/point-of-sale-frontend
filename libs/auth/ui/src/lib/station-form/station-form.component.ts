import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/** What the station form emits. */
export interface StationFormValue {
  stationNumber: number;
}

@Component({
  selector: 'pos-frontend-station-form',
  templateUrl: './station-form.component.html',
  styleUrl: './station-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class StationFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef = inject(MatDialogRef<unknown>, { optional: true });

  readonly title = input('');
  readonly loading = input(false);
  readonly btnTitle = input('Set Station');

  readonly formValue = output<StationFormValue>();

  protected readonly stationForm = this.fb.group({
    stationNumber: this.fb.control<number | null>(null, Validators.required),
  });

  protected cancel(): void {
    this.dialogRef?.close(false);
  }

  protected submit(): void {
    const { stationNumber } = this.stationForm.getRawValue();
    if (this.stationForm.invalid || stationNumber === null) {
      this.stationForm.markAllAsTouched();
      return;
    }
    this.formValue.emit({ stationNumber });
  }
}

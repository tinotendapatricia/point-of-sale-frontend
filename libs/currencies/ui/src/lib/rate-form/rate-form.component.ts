import { Component, ChangeDetectionStrategy, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'pos-frontend-rate-form',
    templateUrl: './rate-form.component.html',
    styleUrls: ['./rate-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule]
})
export class RateFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<unknown>, { optional: true });

  readonly loading = input(false);
  readonly title = input('');
  readonly btnTitle = input('Submit');
  readonly formValue = output<any>();

  readonly form = this.formBuilder.group({
    id: [''],
    rate: [''],
    effectiveDate: [''],
  });

  cancel() {
    this.dialogRef?.close(false);
  }

  submit() {
    this.formValue.emit(this.form.value);
  }
}

import { Component, ChangeDetectionStrategy, inject, input, output, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfigurationsEntity } from '@pos-frontend/configurations/data-access';

@Component({
    selector: 'pos-frontend-configurations-form',
    templateUrl: './configurations-form.component.html',
    styleUrls: ['./configurations-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule]
})
export class ConfigurationsFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<unknown>, { optional: true });

  readonly configuration = input<ConfigurationsEntity>();
  readonly loading = input(false);
  readonly title = input('');
  readonly btnTitle = input('Submit');
  readonly formValue = output<any>();

  readonly configurationForm = this.formBuilder.group({
    copies: [''],
    printerName: [''],
    stationName: [''],
    stationNumber: [''],
    id: [''],
  });

  constructor() {
    effect(() => {
      const configuration = this.configuration();
      if (configuration) {
        this.configurationForm.patchValue({
          copies: String(configuration.copies),
          printerName: configuration.printerName,
          stationName: configuration.stationName,
          stationNumber: String(configuration.stationNumber),
          id: String(configuration.id),
        });
      }
    });
  }

  cancel() {
    this.dialogRef?.close(false);
  }

  submit() {
    this.formValue.emit(this.configurationForm.value);
  }
}

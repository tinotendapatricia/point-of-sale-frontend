import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import type { ConfigurationRequest, ConfigurationsEntity } from '@pos-frontend/configurations/data-access';

/** What the form emits: only the fields the user edits, never id or audit fields. */
export type ConfigurationFormValue = ConfigurationRequest;

@Component({
  selector: 'pos-frontend-configurations-form',
  templateUrl: './configurations-form.component.html',
  styleUrl: './configurations-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule],
})
export class ConfigurationsFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly configuration = input<ConfigurationsEntity>();
  readonly loading = input(false);
  readonly submitLabel = input('Submit');

  readonly submitted = output<ConfigurationFormValue>();
  readonly cancelled = output<void>();

  protected readonly form = this.fb.group({
    stationName: ['', Validators.required],
    stationNumber: [50, [Validators.required, Validators.min(50)]],
    printerName: ['', Validators.required],
    copies: [1, [Validators.required, Validators.min(1)]],
  });

  constructor() {
    effect(() => {
      const configuration = this.configuration();
      if (configuration) {
        this.form.reset({
          stationName: configuration.stationName,
          stationNumber: configuration.stationNumber,
          printerName: configuration.printerName,
          copies: configuration.copies,
        });
      }
    });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit(this.form.getRawValue());
  }
}

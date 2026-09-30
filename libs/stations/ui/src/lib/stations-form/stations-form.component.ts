import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import type { CreateStationRequest, StationsEntity } from '@pos-frontend/stations/data-access';

/** What the form emits: only the fields the user edits. */
export type StationFormValue = CreateStationRequest;

@Component({
  selector: 'pos-frontend-stations-form',
  templateUrl: './stations-form.component.html',
  styleUrl: './stations-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule],
})
export class StationsFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly station = input<StationsEntity>();
  readonly loading = input(false);
  readonly submitLabel = input('Submit');

  readonly submitted = output<StationFormValue>();
  readonly cancelled = output<void>();

  protected readonly form = this.fb.group({
    account: ['', Validators.required],
    name: ['', Validators.required],
    address: [''],
    contact: [''],
  });

  constructor() {
    effect(() => {
      const station = this.station();
      if (station) {
        this.form.reset({ account: String(station.number), name: station.name, address: '', contact: '' });
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

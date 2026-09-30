import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import type { LoginCredentials } from '@pos-frontend/auth/data-access';

@Component({
  selector: 'pos-frontend-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class LoginFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly title = input('');
  readonly isClient = input(false);
  readonly loading = input(false);
  /** Till station number, shown on the client login. The host reads it from storage. */
  readonly station = input<string | null>(null);

  readonly license = output<void>();
  readonly setStation = output<void>();
  readonly formValue = output<LoginCredentials>();

  protected readonly form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.formValue.emit(this.form.getRawValue());
  }
}

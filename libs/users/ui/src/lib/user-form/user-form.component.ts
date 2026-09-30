import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import type { UsersEntity } from '@pos-frontend/users/data-access';

/** What the form emits: only the fields the user edits. */
export interface UserFormValue {
  username: string;
  name: string;
  /** Required when creating; may be left blank when editing. */
  password: string;
}

@Component({
  selector: 'pos-frontend-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class UserFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly user = input<UsersEntity>();
  readonly loading = input(false);
  readonly submitLabel = input('Submit');

  readonly submitted = output<UserFormValue>();
  readonly cancelled = output<void>();

  protected readonly hidePassword = signal(true);

  protected readonly form = this.fb.group({
    username: ['', Validators.required],
    name: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor() {
    // Edit mode: the password becomes optional, and the form is reset so it is pristine again.
    effect(() => {
      const user = this.user();
      if (user) {
        this.form.controls.password.clearValidators();
        this.form.reset({ username: user.username, name: user.name, password: '' });
      }
    });
  }

  protected togglePassword(): void {
    this.hidePassword.update((hidden) => !hidden);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit(this.form.getRawValue());
  }
}

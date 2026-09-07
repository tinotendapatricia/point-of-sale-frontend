import { Component, ChangeDetectionStrategy, inject, input, output, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'pos-frontend-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule]
})
export class LoginFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly title = input('');
  readonly isClient = input(false);
  readonly loading = input(false);
  readonly license = output<void>();
  readonly setStation = output<void>();
  readonly formValue = output<unknown>();

  readonly station = signal(localStorage.getItem('station'));

  readonly form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit() {
    this.formValue.emit(this.form.value);
  }
}

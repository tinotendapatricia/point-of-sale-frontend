import { Component, ChangeDetectionStrategy, inject, input, output, effect, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GroupsEntity } from '@pos-frontend/groups/data-access';
import { UsersEntity } from '@pos-frontend/users/data-access';

@Component({
    selector: 'pos-frontend-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule]
})
export class UserFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<unknown>, { optional: true });

  readonly user = input<UsersEntity>();
  readonly loading = input(false);
  readonly groups = input<GroupsEntity[]>([]);
  readonly title = input('');
  readonly btnTitle = input('Submit');
  readonly formValue = output<any>();
  readonly hidePassword = signal(true);

  readonly userForm = this.formBuilder.group({
    username: [''],
    name: [''],
    password: [''],
    id: [''],
  });

  constructor() {
    effect(() => {
      const user = this.user();
      if (user) {
        this.userForm.patchValue({
          username: user.username,
          name: user.name,
          id: String(user.id),
        });
      }
    });
  }

  cancel() {
    this.dialogRef?.close(false);
  }

  submit() {
    this.formValue.emit(this.userForm.value);
  }
}

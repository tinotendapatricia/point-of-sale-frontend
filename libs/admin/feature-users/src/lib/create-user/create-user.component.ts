import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogHeaderComponent } from '@pos-frontend/shared/ui';
import { type UsersEntity, UserStore } from '@pos-frontend/users/data-access';

export interface CreateUserData {
  /** Present when editing an existing user; omit to create a new one. */
  user?: UsersEntity;
}

/** Create/update dialog: opened through MatDialog from the users list. Closes with `true` on success. */
@Component({
  selector: 'pos-frontend-create-user',
  templateUrl: './create-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    DialogHeaderComponent,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
})
export class CreateUserComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef =
    inject<MatDialogRef<CreateUserComponent, boolean>>(MatDialogRef);
  private readonly data = inject<CreateUserData | null>(MAT_DIALOG_DATA, {
    optional: true,
  });
  private readonly userStore = inject(UserStore);

  protected readonly user = this.data?.user;
  protected readonly title = this.user ? 'Update User' : 'Create New User';
  protected readonly submitLabel = this.user ? 'Update' : 'Create';
  protected readonly hidePassword = signal(true);
  protected readonly loading = computed(() =>
    this.user ? this.userStore.updateLoading() : this.userStore.createLoading()
  );

  protected readonly form = this.fb.group({
    username: [this.user?.username ?? '', Validators.required],
    name: [this.user?.name ?? '', Validators.required],
    // Required when creating; a blank value leaves the current password unchanged when editing.
    password: ['', this.user ? [] : [Validators.required]],
  });

  protected togglePassword(): void {
    this.hidePassword.update((hidden) => !hidden);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const callback = () => this.dialogRef.close(true);

    if (this.user) {
      this.userStore.updateUser({
        data: {
          id: this.user.id,
          username: value.username,
          name: value.name,
          password: value.password || undefined,
        },
        callback,
      });
    } else {
      this.userStore.createUser({ data: value, callback });
    }
  }
}

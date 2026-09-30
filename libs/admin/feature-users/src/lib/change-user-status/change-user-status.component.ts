import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActionConfirmationFormComponent } from '@pos-frontend/shared/ui';
import { type UsersEntity, UserStore } from '@pos-frontend/users/data-access';

export interface ChangeUserStatusData {
  user: UsersEntity;
}

/** Confirmation dialog. Open with MatDialog and `data: { user }`; closes with `true` on success. */
@Component({
  selector: 'pos-frontend-change-user-status',
  templateUrl: './change-user-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ActionConfirmationFormComponent],
})
export class ChangeUserStatusComponent {
  private readonly dialogRef =
    inject<MatDialogRef<ChangeUserStatusComponent, boolean>>(MatDialogRef);
  private readonly userStore = inject(UserStore);
  private readonly data = inject<ChangeUserStatusData>(MAT_DIALOG_DATA);

  protected readonly submitting = this.userStore.changeStatusLoading;

  protected submit(): void {
    const { user } = this.data;
    this.userStore.changeUserStatus({
      data: { userId: user.id, status: !user.active },
      callback: () => this.dialogRef.close(true),
    });
  }
}

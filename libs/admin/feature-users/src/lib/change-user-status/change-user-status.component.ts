import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersEntity, UsersFacade } from '@pos-frontend/users/data-access';
import { ActionConfirmationFormComponent } from '@pos-frontend/shared/ui';

export interface ChangeUserStatusData {
  user: UsersEntity;
}

@Component({
  selector: 'pos-frontend-change-user-status',
  templateUrl: './change-user-status.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./change-user-status.component.scss'],
  imports: [ActionConfirmationFormComponent],
})
export class ChangeUserStatusComponent {
  private readonly dialogRef = inject(MatDialogRef<ChangeUserStatusComponent, boolean>);
  private readonly usersFacade = inject(UsersFacade);
  private readonly data = inject<ChangeUserStatusData>(MAT_DIALOG_DATA);

  readonly user = this.data.user;
  readonly submitting = signal(false);

  onSubmit() {
    this.submitting.set(true);
    this.usersFacade.changeUserStatus({
      userId: this.user.id,
      status: !this.user.active,
    });
    this.usersFacade.loaded$.pipe(take(1)).subscribe((loaded) => {
      this.submitting.set(false);
      if (loaded) {
        this.dialogRef.close(true);
      }
    });
  }
}

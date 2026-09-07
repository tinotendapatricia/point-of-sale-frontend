import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { UsersEntity, UsersFacade } from '@pos-frontend/users/data-access';
import { UserFormComponent } from '@pos-frontend/users/ui';

export interface UpdateUserData {
  user: UsersEntity;
}

@Component({
    selector: 'pos-frontend-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [UserFormComponent]
})
export class UpdateUserComponent {
  private readonly dialogRef = inject(MatDialogRef<UpdateUserComponent, boolean>);
  private readonly data = inject<UpdateUserData>(MAT_DIALOG_DATA);
  readonly usersFacade = inject(UsersFacade);

  readonly user = this.data.user;
  readonly submitting = signal(false);

  public updateUser(user: any) {
    this.submitting.set(true);
    this.usersFacade.updateUser(user);
    this.usersFacade.loaded$.pipe(take(1)).subscribe((loaded) => {
      this.submitting.set(false);
      if (loaded) {
        this.dialogRef.close(true);
      }
    });
  }
}

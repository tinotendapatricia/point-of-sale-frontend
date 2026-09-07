import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

import { UsersFacade } from '@pos-frontend/users/data-access';
import { UserFormComponent } from '@pos-frontend/users/ui';

@Component({
    selector: 'pos-frontend-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [UserFormComponent]
})
export class CreateUserComponent {
  private readonly dialogRef = inject(MatDialogRef<CreateUserComponent, boolean>);
  readonly usersService = inject(UsersFacade);

  readonly submitting = signal(false);

  public createUser(user: any) {
    this.submitting.set(true);
    this.usersService.createNewUser(user);
    this.usersService.loaded$.pipe(take(1)).subscribe((loaded) => {
      this.submitting.set(false);
      if (loaded) {
        this.dialogRef.close(true);
      }
    });
  }
}

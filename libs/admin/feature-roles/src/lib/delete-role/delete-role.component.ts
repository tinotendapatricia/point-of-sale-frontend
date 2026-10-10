import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { type RolesEntity, RoleStore } from '@pos-frontend/roles/data-access';
import { ActionConfirmationFormComponent } from '@pos-frontend/shared/ui';

export interface DeleteRoleData {
  role: RolesEntity;
}

/** Confirmation dialog. Open with MatDialog and `data: { role }`; closes with `true` on success. */
@Component({
  selector: 'pos-frontend-delete-role',
  template: `<pos-frontend-action-confirmation-form title="Delete Role" [message]="message" [loading]="submitting()" (proceed)="submit()" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ActionConfirmationFormComponent],
})
export class DeleteRoleComponent {
  private readonly dialogRef = inject<MatDialogRef<DeleteRoleComponent, boolean>>(MatDialogRef);
  private readonly roleStore = inject(RoleStore);
  private readonly data = inject<DeleteRoleData>(MAT_DIALOG_DATA);

  protected readonly message = `Delete the role "${this.data.role.name}"? Users holding it will lose its permissions.`;
  protected readonly submitting = this.roleStore.deleteLoading;

  protected submit(): void {
    this.roleStore.deleteRole({
      data: this.data.role.id,
      callback: () => this.dialogRef.close(true),
    });
  }
}

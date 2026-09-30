import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { type GroupsEntity, GroupStore } from '@pos-frontend/groups/data-access';
import { ActionConfirmationFormComponent } from '@pos-frontend/shared/ui';

export interface DeleteGroupData {
  group: GroupsEntity;
}

/** Confirmation dialog. Open with MatDialog and `data: { group }`; closes with `true` on success. */
@Component({
  selector: 'pos-frontend-delete-group',
  templateUrl: './delete-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ActionConfirmationFormComponent],
})
export class DeleteGroupComponent {
  private readonly dialogRef = inject<MatDialogRef<DeleteGroupComponent, boolean>>(MatDialogRef);
  private readonly groupStore = inject(GroupStore);
  private readonly data = inject<DeleteGroupData>(MAT_DIALOG_DATA);

  protected readonly submitting = this.groupStore.deleteLoading;
  protected readonly message = `Are you sure you want to delete the group "${this.data.group.name}"?`;

  protected submit(): void {
    this.groupStore.deleteGroup({
      data: this.data.group.id,
      callback: () => this.dialogRef.close(true),
    });
  }
}

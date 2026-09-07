import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { GroupsFacade } from '@pos-frontend/groups/data-access';
import { GroupFormComponent } from '@pos-frontend/groups/ui';

@Component({
    selector: 'pos-frontend-create-group',
    templateUrl: './create-group.component.html',
    styleUrls: ['./create-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [GroupFormComponent]
})
export class CreateGroupComponent {
  private readonly dialogRef = inject(MatDialogRef<CreateGroupComponent, boolean>);
  readonly groupsService = inject(GroupsFacade);

  readonly submitting = signal(false);

  public createGroup(group: any) {
    this.submitting.set(true);
    this.groupsService.createNewGroup(group);
    this.groupsService.loaded$.pipe(take(1)).subscribe((loaded) => {
      this.submitting.set(false);
      if (loaded) {
        this.dialogRef.close(true);
      }
    });
  }
}

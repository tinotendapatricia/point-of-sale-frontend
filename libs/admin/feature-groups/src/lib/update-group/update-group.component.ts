import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { injectDrawerRef } from '@pos-frontend/core';
import { type GroupsEntity, GroupStore } from '@pos-frontend/groups/data-access';
import { GroupFormComponent, type GroupFormValue } from '@pos-frontend/groups/ui';

/** Drawer content. Open through DrawerService with `data: group`; closes with `true` on success. */
@Component({
  selector: 'pos-frontend-update-group',
  templateUrl: './update-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GroupFormComponent],
})
export class UpdateGroupComponent {
  private readonly drawerRef = injectDrawerRef<boolean, GroupsEntity>();
  private readonly groupStore = inject(GroupStore);

  protected readonly group = this.drawerRef.data;
  protected readonly submitting = this.groupStore.updateLoading;

  protected update(value: GroupFormValue): void {
    this.groupStore.updateGroup({
      data: { id: this.group.id, ...value },
      callback: () => this.close(true),
    });
  }

  protected close(updated: boolean): void {
    this.drawerRef.close(updated);
  }
}

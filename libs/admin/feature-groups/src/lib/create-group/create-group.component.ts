import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { injectDrawerRef } from '@pos-frontend/core';
import { GroupStore } from '@pos-frontend/groups/data-access';
import { GroupFormComponent, type GroupFormValue } from '@pos-frontend/groups/ui';

@Component({
  selector: 'pos-frontend-create-group',
  templateUrl: './create-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GroupFormComponent],
})
export class CreateGroupComponent {
  private readonly router = inject(Router);
  // null when rendered outside a drawer.
  private readonly drawerRef = injectDrawerRef<boolean>({ optional: true });
  private readonly groupStore = inject(GroupStore);

  protected readonly submitting = this.groupStore.createLoading;

  protected create(value: GroupFormValue): void {
    this.groupStore.createGroup({ data: value, callback: () => this.close(true) });
  }

  protected close(created: boolean): void {
    if (this.drawerRef) {
      this.drawerRef.close(created);
    } else {
      void this.router.navigate(['/groups']);
    }
  }
}

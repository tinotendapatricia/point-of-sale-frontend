import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupStore } from '@pos-frontend/groups/data-access';
import { AssignGroupsUiComponent } from '@pos-frontend/groups/ui';
import { RoleStore } from '@pos-frontend/roles/data-access';

@Component({
  selector: 'pos-frontend-view-group-authorities',
  templateUrl: './view-group-authorities.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, AssignGroupsUiComponent],
})
export class ViewGroupAuthoritiesComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly groupStore = inject(GroupStore);
  private readonly roleStore = inject(RoleStore);

  private readonly groupId = this.route.snapshot.paramMap.get('groupId');

  protected readonly roles = this.roleStore.roles;
  protected readonly group = this.groupStore.group;
  protected readonly groupRoles = computed(() => this.group()?.roles ?? []);
  protected readonly submitting = this.groupStore.assignRolesLoading;

  constructor() {
    this.roleStore.getAllRoles();
    if (this.groupId) {
      this.groupStore.getGroup({ id: this.groupId });
    }
  }

  protected save(roles: string[]): void {
    if (!this.groupId) {
      return;
    }
    this.groupStore.assignGroupRoles({
      data: { groupId: this.groupId, roles },
      callback: () => this.back(),
    });
  }

  protected back(): void {
    void this.router.navigate(['/groups']);
  }
}

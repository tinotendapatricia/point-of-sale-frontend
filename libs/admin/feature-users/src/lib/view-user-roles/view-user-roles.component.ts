import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoleStore } from '@pos-frontend/roles/data-access';
import { UserStore } from '@pos-frontend/users/data-access';
import { UserRolesFormComponent } from '@pos-frontend/users/ui';

@Component({
  selector: 'pos-frontend-view-user-roles',
  templateUrl: './view-user-roles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatButtonModule, UserRolesFormComponent],
})
export class ViewUserRolesComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly userStore = inject(UserStore);
  private readonly roleStore = inject(RoleStore);

  private readonly userId = this.route.snapshot.paramMap.get('userId');

  protected readonly roles = this.roleStore.roles;
  protected readonly user = this.userStore.user;
  protected readonly userRoles = computed(() => this.user()?.roles ?? []);
  protected readonly submitting = this.userStore.assignRolesLoading;
  protected readonly loadingRoles = computed(
    () => this.roleStore.getManyLoading() || this.userStore.getOneLoading()
  );

  constructor() {
    this.roleStore.getAllRoles();
    if (this.userId) {
      this.userStore.getUser({ id: this.userId });
    }
  }

  protected save(roles: string[]): void {
    if (!this.userId) {
      return;
    }
    this.userStore.assignUserRoles({
      data: { userId: this.userId, roles },
      callback: () => void this.router.navigate(['/users']),
    });
  }
}

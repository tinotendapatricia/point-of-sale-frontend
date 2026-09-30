import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { injectDrawerRef } from '@pos-frontend/core';
import { UserStore } from '@pos-frontend/users/data-access';
import { UserFormComponent, type UserFormValue } from '@pos-frontend/users/ui';

@Component({
  selector: 'pos-frontend-create-user',
  templateUrl: './create-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserFormComponent],
})
export class CreateUserComponent {
  private readonly router = inject(Router);
  // null when rendered outside a drawer.
  private readonly drawerRef = injectDrawerRef<boolean>({ optional: true });
  private readonly userStore = inject(UserStore);

  protected readonly submitting = this.userStore.createLoading;

  protected create(value: UserFormValue): void {
    this.userStore.createUser({ data: value, callback: () => this.close(true) });
  }

  protected close(created: boolean): void {
    if (this.drawerRef) {
      this.drawerRef.close(created);
    } else {
      void this.router.navigate(['/users']);
    }
  }
}

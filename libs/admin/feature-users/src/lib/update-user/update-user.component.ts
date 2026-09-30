import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { injectDrawerRef } from '@pos-frontend/core';
import { type UsersEntity, UserStore } from '@pos-frontend/users/data-access';
import { UserFormComponent, type UserFormValue } from '@pos-frontend/users/ui';

/** Drawer content. Open through DrawerService with `data: user`; closes with `true` on success. */
@Component({
  selector: 'pos-frontend-update-user',
  templateUrl: './update-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserFormComponent],
})
export class UpdateUserComponent {
  private readonly drawerRef = injectDrawerRef<boolean, UsersEntity>();
  private readonly userStore = inject(UserStore);

  protected readonly user = this.drawerRef.data;
  protected readonly submitting = this.userStore.updateLoading;

  protected update(value: UserFormValue): void {
    this.userStore.updateUser({
      data: {
        id: this.user.id,
        username: value.username,
        name: value.name,
        // A blank password leaves the current one unchanged.
        password: value.password || undefined,
      },
      callback: () => this.close(true),
    });
  }

  protected close(updated: boolean): void {
    this.drawerRef.close(updated);
  }
}

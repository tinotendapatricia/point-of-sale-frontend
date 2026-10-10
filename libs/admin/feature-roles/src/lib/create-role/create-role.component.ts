import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { injectDrawerRef } from '@pos-frontend/core';
import { type RolesEntity, RoleStore } from '@pos-frontend/roles/data-access';

/**
 * Create/update role form. Open through DrawerService; pass the role as
 * `data` to edit it. Closes with `true` on success.
 */
@Component({
  selector: 'pos-frontend-create-role',
  templateUrl: './create-role.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
})
export class CreateRoleComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly drawerRef = injectDrawerRef<boolean, RolesEntity | undefined>();
  private readonly roleStore = inject(RoleStore);

  protected readonly role = this.drawerRef.data;
  protected readonly submitLabel = this.role ? 'Update' : 'Create';
  protected readonly loading = computed(() =>
    this.role ? this.roleStore.updateLoading() : this.roleStore.createLoading()
  );

  protected readonly form = this.fb.group({
    name: [this.role?.name ?? '', [Validators.required, Validators.maxLength(100)]],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const callback = () => this.close(true);

    if (this.role) {
      this.roleStore.updateRole({ data: { id: this.role.id, ...value }, callback });
    } else {
      this.roleStore.createRole({ data: value, callback });
    }
  }

  protected close(saved: boolean): void {
    this.drawerRef.close(saved);
  }
}

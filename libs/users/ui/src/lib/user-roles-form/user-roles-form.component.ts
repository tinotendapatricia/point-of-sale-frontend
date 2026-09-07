import { Component, ChangeDetectionStrategy, inject, input, output, effect, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RolesEntity } from '@pos-frontend/roles/data-access';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-user-roles-form',
    templateUrl: './user-roles-form.component.html',
    styleUrls: ['./user-roles-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCheckboxModule, MatButtonModule, MatProgressSpinnerModule, TitleCasePipe]
})
export class UserRolesFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly roles = input<RolesEntity[]>([]);
  readonly userRoles = input<{ id: string }[] | undefined>();
  readonly userId = input<string | number>();
  readonly loading = input(false);
  readonly save = output<unknown>();

  readonly checkedRoles = signal<string[]>([]);

  readonly rolesForm = this.formBuilder.group({
    roles: this.formBuilder.control<string[]>([]),
    userId: [''],
  });

  constructor() {
    effect(() => {
      const userRoles = this.userRoles();
      if (userRoles) {
        this.checkedRoles.set(userRoles.map((role) => role.id));
      }
    });
    effect(() => {
      const userId = this.userId();
      if (userId) {
        this.rolesForm.get('userId')?.patchValue(String(userId));
      }
    });
  }

  isChecked(id: string) {
    return this.checkedRoles().includes(id);
  }

  toggleRole(id: string) {
    this.checkedRoles.update((roles) =>
      roles.includes(id) ? roles.filter((r) => r !== id) : [...roles, id]
    );
  }

  isAllSelected() {
    return this.checkedRoles().length === this.roles().length && this.roles().length > 0;
  }

  toggleAllRoles() {
    this.checkedRoles.set(this.isAllSelected() ? [] : this.roles().map((role) => role.id));
  }

  onSave() {
    this.rolesForm.get('roles')?.patchValue(this.checkedRoles());
    this.save.emit(this.rolesForm.value);
  }
}

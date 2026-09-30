import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import type { RolesEntity } from '@pos-frontend/roles/data-access';

@Component({
  selector: 'pos-frontend-assign-groups-ui',
  templateUrl: './assign-groups-ui.component.html',
  styleUrl: './assign-groups-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCheckboxModule, MatButtonModule, MatProgressSpinnerModule, TitleCasePipe],
})
export class AssignGroupsUiComponent {
  /** Every role that can be assigned. */
  readonly roles = input<RolesEntity[]>([]);
  /** Roles the group already has; they start checked. */
  readonly groupRoles = input<Pick<RolesEntity, 'id'>[]>([]);
  readonly loading = input(false);

  /** The ids of the checked roles. */
  readonly saved = output<string[]>();
  readonly cancelled = output<void>();

  protected readonly checkedRoles = linkedSignal(() => this.groupRoles().map((role) => role.id));

  protected readonly allSelected = computed(
    () => this.roles().length > 0 && this.checkedRoles().length === this.roles().length,
  );

  protected isChecked(id: string): boolean {
    return this.checkedRoles().includes(id);
  }

  protected toggleRole(id: string): void {
    this.checkedRoles.update((roles) =>
      roles.includes(id) ? roles.filter((r) => r !== id) : [...roles, id],
    );
  }

  /** Checks every role (it never clears them, matching the original behaviour). */
  protected selectAllRoles(): void {
    this.checkedRoles.set(this.roles().map((role) => role.id));
  }

  protected roleLabel(role: RolesEntity): string {
    return role.name.split('_').join(' ');
  }

  protected save(): void {
    this.saved.emit(this.checkedRoles());
  }
}

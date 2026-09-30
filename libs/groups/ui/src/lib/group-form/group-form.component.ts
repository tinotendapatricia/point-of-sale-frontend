import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import type { GroupsEntity } from '@pos-frontend/groups/data-access';

/** What the form emits: only the fields the user edits. */
export type GroupFormValue = Pick<GroupsEntity, 'name'>;

@Component({
  selector: 'pos-frontend-group-form',
  templateUrl: './group-form.component.html',
  styleUrl: './group-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule],
})
export class GroupFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly group = input<GroupsEntity>();
  readonly loading = input(false);
  readonly submitLabel = input('Submit');

  readonly submitted = output<GroupFormValue>();
  readonly cancelled = output<void>();

  protected readonly form = this.fb.group({
    name: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const group = this.group();
      if (group) {
        this.form.reset({ name: group.name });
      }
    });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit(this.form.getRawValue());
  }
}

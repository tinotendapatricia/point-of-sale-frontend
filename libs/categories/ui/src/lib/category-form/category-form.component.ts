import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import type { CategoryEntity } from '@pos-frontend/categories/data-access';

/** What the form emits: only the fields the user edits, never id or audit fields. */
export type CategoryFormValue = Pick<CategoryEntity, 'name' | 'code'>;

@Component({
  selector: 'pos-frontend-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class CategoryFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly category = input<CategoryEntity>();
  readonly loading = input(false);
  readonly submitLabel = input('Submit');

  readonly submitted = output<CategoryFormValue>();
  readonly cancelled = output<void>();

  protected readonly form = this.fb.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const category = this.category();
      if (category) {
        this.form.reset({ name: category.name, code: category.code });
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

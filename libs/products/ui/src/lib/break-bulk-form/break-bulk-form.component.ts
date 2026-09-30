import {
  ChangeDetectionStrategy,
  Component,
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
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';
import type {
  BreakProductRequest,
  ProductsEntity,
} from '@pos-frontend/products/data-access';

/** What the form emits: exactly the break-bulk request body. */
export type BreakBulkFormValue = BreakProductRequest;

@Component({
  selector: 'pos-frontend-break-bulk-form',
  templateUrl: './break-bulk-form.component.html',
  styleUrl: './break-bulk-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NgSelectComponent,
    NgOptionComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class BreakBulkFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly products = input<ProductsEntity[]>([]);
  readonly loading = input(false);
  readonly submitLabel = input('Submit');

  readonly submitted = output<BreakBulkFormValue>();
  readonly cancelled = output<void>();

  protected readonly form = this.fb.group({
    parentId: this.fb.control<string | number | null>(null, Validators.required),
    childId: this.fb.control<string | number | null>(null, Validators.required),
    quantity: [0, [Validators.required, Validators.min(1)]],
    parentSize: [0, [Validators.required, Validators.min(1)]],
  });

  protected submit(): void {
    const { parentId, childId, quantity, parentSize } = this.form.getRawValue();
    if (this.form.invalid || parentId === null || childId === null) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit({ parentId, childId, quantity, parentSize });
  }
}

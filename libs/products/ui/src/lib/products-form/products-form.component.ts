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
import { MatRadioModule } from '@angular/material/radio';
import type { ProductsEntity } from '@pos-frontend/products/data-access';

/** What the form emits: only the fields the user edits, never id or audit fields. */
export type ProductFormValue = Pick<
  ProductsEntity,
  'name' | 'code' | 'barcode' | 'active'
>;

@Component({
  selector: 'pos-frontend-products-form',
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class ProductsFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly product = input<ProductsEntity>();
  readonly loading = input(false);
  readonly submitLabel = input('Submit');

  readonly submitted = output<ProductFormValue>();
  readonly cancelled = output<void>();

  protected readonly form = this.fb.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
    barcode: ['', Validators.required],
    active: [false, Validators.required],
  });

  constructor() {
    effect(() => {
      const product = this.product();
      if (product) {
        this.form.reset({
          name: product.name,
          code: product.code,
          barcode: product.barcode,
          active: product.active,
        });
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

import {
  ChangeDetectionStrategy,
  Component,
  computed,
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

/** Which product value the form edits. */
export type CostPriceMode = 'cost' | 'price';

/** What the form emits; the container maps `amount` onto `cost` or `price` and adds the product id. */
export interface CostPriceFormValue {
  amount: number;
  effectiveDate: string;
}

@Component({
  selector: 'pos-frontend-update-cost-and-price',
  templateUrl: './update-cost-and-price.component.html',
  styleUrl: './update-cost-and-price.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class UpdateCostAndPriceComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly mode = input.required<CostPriceMode>();
  readonly loading = input(false);
  readonly submitLabel = input('Submit');

  readonly submitted = output<CostPriceFormValue>();
  readonly cancelled = output<void>();

  protected readonly amountLabel = computed(() =>
    this.mode() === 'cost' ? 'Cost' : 'Price'
  );

  protected readonly form = this.fb.group({
    amount: [0, [Validators.required, Validators.min(0)]],
    effectiveDate: [''],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit(this.form.getRawValue());
  }
}

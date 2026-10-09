import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';
import { ProductStore } from '@pos-frontend/products/data-access';

@Component({
  selector: 'pos-frontend-break-bulk-to-single',
  templateUrl: './break-bulk-to-single.component.html',
  styleUrl: './break-bulk-to-single.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    NgSelectComponent,
    NgOptionComponent,
  ],
})
export class BreakBulkToSingleComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  protected readonly productStore = inject(ProductStore);

  protected readonly loading = this.productStore.breakLoading;

  protected readonly form = this.fb.group({
    parentId: this.fb.control<string | number | null>(null, Validators.required),
    childId: this.fb.control<string | number | null>(null, Validators.required),
    quantity: [0, [Validators.required, Validators.min(1)]],
    parentSize: [0, [Validators.required, Validators.min(1)]],
  });

  constructor() {
    this.productStore.getAllProducts();
  }

  protected submit(): void {
    const { parentId, childId, quantity, parentSize } = this.form.getRawValue();
    if (this.form.invalid || parentId === null || childId === null) {
      this.form.markAllAsTouched();
      return;
    }

    this.productStore.breakProduct({
      data: { parentId, childId, quantity, parentSize },
      // Quantities change after a break, so reload the product options.
      callback: () => this.productStore.getAllProducts(),
    });
  }

  protected cancel(): void {
    void this.router.navigate(['/products']);
  }
}

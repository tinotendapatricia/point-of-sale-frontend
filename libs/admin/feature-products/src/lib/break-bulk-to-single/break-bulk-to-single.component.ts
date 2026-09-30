import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ProductStore } from '@pos-frontend/products/data-access';
import {
  BreakBulkFormComponent,
  type BreakBulkFormValue,
} from '@pos-frontend/products/ui';

@Component({
  selector: 'pos-frontend-break-bulk-to-single',
  templateUrl: './break-bulk-to-single.component.html',
  styleUrl: './break-bulk-to-single.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardContent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    BreakBulkFormComponent,
  ],
})
export class BreakBulkToSingleComponent {
  private readonly router = inject(Router);
  protected readonly productStore = inject(ProductStore);

  protected readonly submitting = this.productStore.breakLoading;

  constructor() {
    this.productStore.getAllProducts();
  }

  protected refresh(): void {
    this.productStore.getAllProducts();
  }

  protected breakBulk(value: BreakBulkFormValue): void {
    this.productStore.breakProduct({
      data: value,
      // Quantities change after a break, so reload the product options.
      callback: () => this.productStore.getAllProducts(),
    });
  }

  protected cancel(): void {
    void this.router.navigate(['/products']);
  }
}

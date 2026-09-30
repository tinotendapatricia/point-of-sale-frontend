import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductStore } from '@pos-frontend/products/data-access';
import {
  type ProductFormValue,
  ProductsFormComponent,
} from '@pos-frontend/products/ui';

@Component({
  selector: 'pos-frontend-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCard, MatCardContent, ProductsFormComponent],
})
export class UpdateProductComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly productStore = inject(ProductStore);

  protected readonly submitting = this.productStore.updateLoading;

  constructor() {
    const id = this.route.snapshot.paramMap.get('productId');
    if (id) {
      this.productStore.getProduct({ id });
    }
  }

  protected update(value: ProductFormValue): void {
    const current = this.productStore.product();
    if (!current) {
      return;
    }
    this.productStore.updateProduct({
      data: { ...current, ...value },
      callback: () => void this.router.navigate(['/products']),
    });
  }

  protected cancel(): void {
    void this.router.navigate(['/products']);
  }
}

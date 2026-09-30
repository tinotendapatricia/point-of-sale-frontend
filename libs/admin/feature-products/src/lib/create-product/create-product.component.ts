import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { injectDrawerRef } from '@pos-frontend/core';
import { ProductStore } from '@pos-frontend/products/data-access';
import {
  type ProductFormValue,
  ProductsFormComponent,
} from '@pos-frontend/products/ui';

@Component({
  selector: 'pos-frontend-create-product',
  templateUrl: './create-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductsFormComponent],
})
export class CreateProductComponent {
  private readonly router = inject(Router);
  // null on the routed /products/new page; present when opened through DrawerService.
  private readonly drawerRef = injectDrawerRef<boolean>({ optional: true });
  private readonly productStore = inject(ProductStore);

  protected readonly submitting = this.productStore.createLoading;

  protected create(value: ProductFormValue): void {
    this.productStore.createProduct({
      data: value,
      callback: () => this.close(true),
    });
  }

  protected close(created: boolean): void {
    if (this.drawerRef) {
      this.drawerRef.close(created);
    } else {
      void this.router.navigate(['/products']);
    }
  }
}

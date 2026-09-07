import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { ProductsEntity, ProductStore } from '@pos-frontend/products/data-access';
import { injectDrawerRef } from '@pos-frontend/core';
import { ProductsFormComponent } from '@pos-frontend/products/ui';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-create-product',
    templateUrl: './create-product.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ProductsFormComponent, AsyncPipe]
})
export class CreateProductComponent {
  private readonly router = inject(Router);
  // Only present when opened via DrawerService — absent for the routed `/products/new` page.
  private readonly drawerRef = injectDrawerRef<boolean>({ optional: true });
  protected readonly productsStore = inject(ProductStore);
  protected readonly currenciesFacade = inject(CurrenciesFacade);

  protected readonly submitting = this.productsStore.createLoading;

  public createProduct(product: ProductsEntity) {
    this.productsStore.createProduct({
      data: product,
      callback: () => {
        if (this.drawerRef) {
          this.drawerRef.close(true);
        } else {
          this.router.navigate(['/products']);
        }
      },
    });
  }
}

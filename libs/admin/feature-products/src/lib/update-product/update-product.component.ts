import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { ProductsEntity, ProductStore } from '@pos-frontend/products/data-access';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ProductsFormComponent } from '@pos-frontend/products/ui';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-update-product',
    templateUrl: './update-product.component.html',
    styleUrls: ['./update-product.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, ProductsFormComponent, AsyncPipe]
})
export class UpdateProductComponent {
  private readonly router = inject(Router);
  protected readonly productsStore = inject(ProductStore);
  protected readonly currenciesFacade = inject(CurrenciesFacade);

  protected readonly submitting = this.productsStore.updateLoading;

  public createProduct(product: ProductsEntity) {
    this.productsStore.updateProduct({
      data: product,
      callback: () => this.router.navigate(['/products']),
    });
  }
}

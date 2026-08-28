import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { ProductsFacade } from '@pos-frontend/products/data-access';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ProductsFormComponent } from '../../../../../products/ui/src/lib/products-form/products-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-update-product',
    templateUrl: './update-product.component.html',
    styleUrls: ['./update-product.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, ProductsFormComponent, AsyncPipe]
})
export class UpdateProductComponent {

  @Output() closeModal = new EventEmitter();
  constructor(
    public productsService: ProductsFacade,
    private router: Router,
    public currenciesFacade: CurrenciesFacade
  ) {}

  ngOnInit(): void {
    // this.productsFacade.getAllProducts();
  }

  public createProduct(product: any) {
    this.productsService.updateProduct(product);
    this.productsService.loaded$.subscribe((res) => {
      res ? this.router.navigate(['/products']) : null;
    });
  }
}

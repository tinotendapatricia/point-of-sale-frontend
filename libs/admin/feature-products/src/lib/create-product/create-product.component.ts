import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { ProductsFacade } from '@pos-frontend/products/data-access';

@Component({
    selector: 'pos-frontend-create-product',
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CreateProductComponent {
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
    this.productsService.createNewProduct(product);
    this.productsService.loaded$.subscribe((res) => {
      res ? this.router.navigate(['/products']) : null;
    });
  }
}

import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import {
  ProductsEntity,
  ProductsFacade,
} from '@pos-frontend/products/data-access';

@Component({
  selector: 'pos-frontend-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements AfterViewChecked {
  public isUpdate = false;
  public isUpdateCost = false;
  public isUpdatePrice = false;
  public isCreate = false;
  public isChangeStatus = false;
  public selectedProduct!: ProductsEntity;

  constructor(
    public productsFacade: ProductsFacade,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  public getProductList(state: ClrDatagridStateInterface) {
    this.productsFacade.getPaginatedProducts(state);
  }

  refresh() {
    this.isUpdate = false;
    this.isCreate = false;
   this.isUpdateCost = false;
    this.isUpdatePrice = false;
    this.isChangeStatus = false;
    this.getProductList({});
  }

  updateCost(product: ProductsEntity) {
    this.selectedProduct = product;
    this.isUpdateCost = true;
  }

  updatePrice(product: ProductsEntity) {
    this.selectedProduct = product;
    this.isUpdatePrice = true;
  }

  viewProduct(product: ProductsEntity) {
    this.router.navigate(['./product-details', product.id], {
      relativeTo: this.route,
    });
  }

  changeProductstatus(product: ProductsEntity) {
    this.selectedProduct = product;
    this.isChangeStatus = true;
  }

  updateProduct(productId: any) {
    this.productsFacade.getProduct(productId)
    this.router.navigate(['./update', productId], {
      relativeTo: this.route,
    });
  }
}

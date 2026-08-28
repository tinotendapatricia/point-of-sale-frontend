import { AfterViewChecked, ChangeDetectorRef, Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, RouterLinkActive, RouterLink } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import {
  ProductsEntity,
  ProductsFacade,
} from '@pos-frontend/products/data-access';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ClrIcon, ClrIconModule } from '@clr/angular/icon';
import { ProductsListUiComponent } from '@pos-frontend/products/ui';
import { UpdateCostComponent } from '../update-cost/update-cost.component';
import { UpdatePriceComponent } from '../update-price/update-price.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-list-products',
    templateUrl: './list-products.component.html',
    styleUrls: ['./list-products.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, RouterLinkActive, RouterLink, ClrIcon, ClrIconModule, ProductsListUiComponent, UpdateCostComponent, UpdatePriceComponent, AsyncPipe]
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

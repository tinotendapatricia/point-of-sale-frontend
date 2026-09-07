import { Component, ChangeDetectionStrategy, Injector, TemplateRef, computed, inject, viewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CurrencyPipe } from '@angular/common';
import { DrawerService } from '@pos-frontend/core';
import { BmgTable, TableColumnDef } from '@pos-frontend/shared/ui';
import {
  ProductsEntity,
  ProductStore,
} from '@pos-frontend/products/data-access';
import { CreateProductComponent } from '../create-product/create-product.component';
import { UpdateCostComponent } from '../update-cost/update-cost.component';
import { UpdatePriceComponent } from '../update-price/update-price.component';

@Component({
    selector: 'pos-frontend-list-products',
    templateUrl: './list-products.component.html',
    styleUrls: ['./list-products.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [BmgTable, MatIconModule, MatButtonModule, MatMenuModule, CurrencyPipe],
})
export class ListProductsComponent {
  private readonly dialog = inject(MatDialog);
  private readonly drawer = inject(DrawerService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  // CreateProductComponent still depends on CurrenciesFacade, which is only
  // provided on this route — DrawerService's own injector is the app root,
  // so it needs this route's injector passed through explicitly.
  private readonly injector = inject(Injector);

  protected readonly productsStore = inject(ProductStore);
  protected readonly loading = this.productsStore.getPaginatedLoading;
  protected readonly total = this.productsStore.totalProducts;
  protected readonly dataSource = computed(
    () => new MatTableDataSource(this.productsStore.paginatedProducts()),
  );

  private readonly costTpl = viewChild<TemplateRef<unknown>>('costTpl');
  private readonly priceTpl = viewChild<TemplateRef<unknown>>('priceTpl');
  private readonly activeTpl = viewChild<TemplateRef<unknown>>('activeTpl');
  private readonly actionsTpl = viewChild<TemplateRef<unknown>>('actionsTpl');

  protected readonly columns = computed<TableColumnDef[]>(() => [
    { key: 'code', header: 'Code' },
    { key: 'name', header: 'Name' },
    { key: 'barcode', header: 'Barcode' },
    { key: 'quantity', header: 'Quantity', align: 'right' },
    { key: 'cost', header: 'Current Unit Cost', align: 'right', template: this.costTpl() },
    { key: 'price', header: 'Current Unit Price', align: 'right', template: this.priceTpl() },
    { key: 'active', header: 'Status', align: 'center', template: this.activeTpl() },
    { key: 'actions', header: '', template: this.actionsTpl() },
  ]);

  constructor() {
    this.getProductList({ pageIndex: 0, pageSize: 10 } as PageEvent);
  }

  getProductList(event: PageEvent) {
    this.productsStore.getPaginatedProducts({
      page: event.pageIndex,
      size: event.pageSize,
    });
  }

  refresh() {
    this.getProductList({ pageIndex: 0, pageSize: 10 } as PageEvent);
  }

  addProduct() {
    this.drawer
      .open<CreateProductComponent, boolean>(CreateProductComponent, {
        title: 'New Product',
        size: 'full',
        injector: this.injector,
      })
      .afterClosed()
      .subscribe((created) => created && this.refresh());
  }

  updateCost(product: ProductsEntity) {
    this.dialog
      .open(UpdateCostComponent, { width: '420px', data: { product } })
      .afterClosed()
      .subscribe((updated) => updated && this.refresh());
  }

  updatePrice(product: ProductsEntity) {
    this.dialog
      .open(UpdatePriceComponent, { width: '420px', data: { product } })
      .afterClosed()
      .subscribe((updated) => updated && this.refresh());
  }

  viewProduct(product: ProductsEntity) {
    this.router.navigate(['./product-details', product.id], {
      relativeTo: this.route,
    });
  }

  updateProduct(productId: string | number) {
    this.productsStore.getProduct({ id: productId });
    this.router.navigate(['./update', productId], {
      relativeTo: this.route,
    });
  }
}

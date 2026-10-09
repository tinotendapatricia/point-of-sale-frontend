import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type TemplateRef,
  computed,
  inject,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { type PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PosBadgeDirective } from '@pos-frontend/core';
import {
  type ProductsEntity,
  ProductStore,
} from '@pos-frontend/products/data-access';
import { BmgTable, type TableColumnDef } from '@pos-frontend/shared/ui';
import {
  CreateProductComponent,
  type CreateProductData,
} from '../create-product/create-product.component';
import {
  UpdateCostComponent,
  type UpdateCostData,
} from '../update-cost/update-cost.component';
import {
  UpdatePriceComponent,
  type UpdatePriceData,
} from '../update-price/update-price.component';

const FIRST_PAGE = { page: 0, size: 10 };

@Component({
  selector: 'pos-frontend-list-products',
  templateUrl: './list-products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BmgTable,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    CurrencyPipe,
    PosBadgeDirective,
  ],
})
export class ListProductsComponent {
  private readonly dialog = inject(MatDialog);
  private readonly productStore = inject(ProductStore);

  private readonly costTpl = viewChild<TemplateRef<unknown>>('costTpl');
  private readonly priceTpl = viewChild<TemplateRef<unknown>>('priceTpl');
  private readonly activeTpl = viewChild<TemplateRef<unknown>>('activeTpl');
  private readonly actionsTpl = viewChild<TemplateRef<unknown>>('actionsTpl');

  protected readonly loading = this.productStore.getPaginatedLoading;
  protected readonly total = this.productStore.totalProducts;
  protected readonly dataSource = computed(
    () => new MatTableDataSource(this.productStore.paginatedProducts())
  );

  protected readonly columns = computed<TableColumnDef[]>(() => [
    { key: 'code', header: 'Code' },
    { key: 'name', header: 'Name' },
    { key: 'barcode', header: 'Barcode' },
    { key: 'quantity', header: 'Quantity', align: 'right' },
    { key: 'cost', header: 'Current Unit Cost', align: 'right', template: this.costTpl() },
    { key: 'price', header: 'Current Unit Price', align: 'right', template: this.priceTpl() },
    { key: 'active', header: 'Status', align: 'center', template: this.activeTpl() },
    { key: 'actions', header: '', align: 'right', template: this.actionsTpl() },
  ]);

  constructor() {
    this.productStore.getPaginatedProducts(FIRST_PAGE);
  }

  protected onPage(event: PageEvent): void {
    this.productStore.getPaginatedProducts({
      page: event.pageIndex,
      size: event.pageSize,
    });
  }

  protected add(): void {
    this.dialog
      .open<CreateProductComponent, CreateProductData, boolean>(CreateProductComponent, {
        width: '480px',
      })
      .afterClosed()
      .subscribe((created) => this.refreshIf(created));
  }

  protected edit(product: ProductsEntity): void {
    this.dialog
      .open<CreateProductComponent, CreateProductData, boolean>(CreateProductComponent, {
        width: '480px',
        data: { product },
      })
      .afterClosed()
      .subscribe((updated) => this.refreshIf(updated));
  }

  protected updateCost(product: ProductsEntity): void {
    this.dialog
      .open<UpdateCostComponent, UpdateCostData, boolean>(UpdateCostComponent, {
        width: '420px',
        data: { product },
      })
      .afterClosed()
      .subscribe((updated) => this.refreshIf(updated));
  }

  protected updatePrice(product: ProductsEntity): void {
    this.dialog
      .open<UpdatePriceComponent, UpdatePriceData, boolean>(UpdatePriceComponent, {
        width: '420px',
        data: { product },
      })
      .afterClosed()
      .subscribe((updated) => this.refreshIf(updated));
  }

  private refreshIf(changed: boolean | undefined): void {
    if (changed) {
      this.productStore.getPaginatedProducts(FIRST_PAGE);
    }
  }
}

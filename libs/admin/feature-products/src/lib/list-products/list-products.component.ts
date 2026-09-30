import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  type TemplateRef,
  computed,
  inject,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { type PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DrawerService, PosBadgeDirective } from '@pos-frontend/core';
import {
  type ProductsEntity,
  ProductStore,
} from '@pos-frontend/products/data-access';
import { BmgTable, type TableColumnDef } from '@pos-frontend/shared/ui';
import { CreateProductComponent } from '../create-product/create-product.component';
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
  private readonly drawer = inject(DrawerService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly injector = inject(Injector);
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
    this.drawer
      .open<CreateProductComponent, boolean>(CreateProductComponent, {
        title: 'New Product',
        size: 'md',
        injector: this.injector,
      })
      .afterClosed()
      .subscribe((created) => this.refreshIf(created));
  }

  protected edit(id: string | number): void {
    void this.router.navigate(['./update', id], { relativeTo: this.route });
  }

  protected updateCost(product: ProductsEntity): void {
    this.drawer
      .open<UpdateCostComponent, boolean, UpdateCostData>(UpdateCostComponent, {
        title: 'Update Cost',
        subtitle: product.name,
        size: 'sm',
        data: { product },
        injector: this.injector,
      })
      .afterClosed()
      .subscribe((updated) => this.refreshIf(updated));
  }

  protected updatePrice(product: ProductsEntity): void {
    this.drawer
      .open<UpdatePriceComponent, boolean, UpdatePriceData>(UpdatePriceComponent, {
        title: 'Update Price',
        subtitle: product.name,
        size: 'sm',
        data: { product },
        injector: this.injector,
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

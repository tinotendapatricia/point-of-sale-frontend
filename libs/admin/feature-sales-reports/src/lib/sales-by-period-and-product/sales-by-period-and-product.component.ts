import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProductStore } from '@pos-frontend/products/data-access';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

@Component({
  selector: 'pos-frontend-sales-by-period-and-product',
  templateUrl: './sales-by-period-and-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, ReportsFormComponent],
})
export class SalesByPeriodAndProductComponent {
  private readonly reportStore = inject(ReportStore);
  private readonly productStore = inject(ProductStore);

  protected readonly loading = this.reportStore.salesLoading;
  protected readonly products = this.productStore.products;

  constructor() {
    this.productStore.getAllProducts();
  }

  protected getPdf({ fromDate, toDate, product }: ReportFormValue): void {
    this.reportStore.getSalesByProductPdf({ fromDate, toDate, product });
  }

  protected getExcel({ fromDate, toDate, product }: ReportFormValue): void {
    this.reportStore.getSalesByProductExcel({ fromDate, toDate, product });
  }
}

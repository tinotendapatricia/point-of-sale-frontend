import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import {
  ProductsEntity,
  ProductStore,
} from '@pos-frontend/products/data-access';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BreakBulkFormComponent } from '@pos-frontend/products/ui';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-break-bulk-to-single',
    templateUrl: './break-bulk-to-single.component.html',
    styleUrls: ['./break-bulk-to-single.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, RouterLinkActive, RouterLink, MatIconModule, BreakBulkFormComponent, AsyncPipe]
})
export class BreakBulkToSingleComponent implements OnInit {
  protected readonly productsStore = inject(ProductStore);

  protected readonly submitting = this.productsStore.breakLoading;

  ngOnInit(): void {
    this.getProductList();
  }

  public getProductList() {
    this.productsStore.getAllProducts();
  }

  onSubmit(details: ProductsEntity) {
    this.productsStore.breakProduct({
      data: details,
      callback: () => undefined,
    });
  }
}

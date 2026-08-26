import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { ProductsEntity } from '@pos-frontend/products/data-access';

@Component({
    selector: 'pos-frontend-products-list-ui',
    templateUrl: './products-list-ui.component.html',
    styleUrls: ['./products-list-ui.component.scss'],
    standalone: false
})
export class ProductsListUiComponent {
  @Input() productList: ProductsEntity[] = [];
  @Input() total = 0;
  @Input() loading = true;
  @Input() placeholderMessage = '';
  @Output() updatedState = new EventEmitter<ClrDatagridStateInterface>();
  @Output() updateSelected = new EventEmitter<any>();
  @Output() viewSelected = new EventEmitter<ProductsEntity>();
  @Output() changeProductStatus = new EventEmitter<ProductsEntity>();
  @Output() updateCost = new EventEmitter<ProductsEntity>();
  @Output() updatePrice = new EventEmitter<ProductsEntity>();
  @Output() viewUProduct = new EventEmitter<string | number>();
  selectedProduct!: ProductsEntity[];
}

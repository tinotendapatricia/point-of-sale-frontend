import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsEntity } from '@pos-frontend/products/data-access';
import {
  CharacterSelectionRequiredValidator,
  SumArray,
  SumQuantity,
  Utilities,
} from '@pos-frontend/shared/utils';
import { Observable } from 'rxjs';
import { CreditorsEntity } from '@pos-frontend/creditors/data-access';
import { NgSelectConfig, NgSelectComponent, NgOptionComponent } from '@ng-select/ng-select';
import { ClrCommonFormsModule } from '@clr/angular/forms/common';
import { ClrInputModule } from '@clr/angular/forms/input';
import { ClrIcon, ClrIconModule } from '@clr/angular/icon';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-purchase-order-form',
    templateUrl: './purchase-order-form.component.html',
    styleUrls: ['./purchase-order-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, ReactiveFormsModule, ClrCommonFormsModule, NgSelectComponent, NgOptionComponent, ClrInputModule, ClrIcon, ClrIconModule, AsyncPipe, CurrencyPipe]
})
export class PurchaseOrderFormComponent implements OnInit {
  @Input() purchaseOrderNumber!: string;
  @Input() products$!: Observable<ProductsEntity[]>;
  @Input() creditors!: CreditorsEntity[];
  @Output() formValue = new EventEmitter();
  date = new Date();
  product: ProductsEntity | undefined;
  purchaseOrderProducts: any[] = [];
  productToBeSubmitted: any[] = [];
  cost = 0;
  quantity = 0;
  btnText = 'Add Product';

  form = new UntypedFormGroup({});
  updateIndex: any;

  constructor(
    private formBuilder: FormBuilder,
    private config: NgSelectConfig
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      creditor: [''],
      code: ['', CharacterSelectionRequiredValidator],
      date: '',
      name: '',
      quantityPurchased: '',
      cost: '',
      cname: '',
      reference: '',
      product: '',
    });
  }

  selectedProd() {
    this.products$.subscribe((res) => {
      this.product = res.find(
        (prod) => prod.code === this.form.get('code')?.value
      );

      this.form.get('name')?.patchValue(this.product?.name);
      this.form.get('cost')?.patchValue(this.product?.cost[0].value);
    });
  }

  addProducts() {
    let product: ProductsEntity | undefined;
    const productCode = this.productToBeSubmitted.find(
      (product) => product.code === this.form.get('code')?.value
    );
    switch (this.btnText) {
      case 'Add Product':
        this.products$.subscribe((res) => {
          product = res.find(
            (pro) => pro.code === this.form.get('code')?.value
          );
        });

        this.form.get('product')?.patchValue(product?.id);

        if (!productCode) {
          this.productToBeSubmitted.push({
            code: this.form.get('code')?.value,
            quantityPurchased: this.form.get('quantityPurchased')?.value,
            product: this.form.get('product')?.value,
            cost:
              this.form.get('cost')?.value *
              this.form.get('quantityPurchased')?.value,
            value:
              this.form.get('cost')?.value *
              this.form.get('quantityPurchased')?.value,
            quantity: this.form.get('quantityPurchased')?.value,
            description: this.form.get('name')?.value,
          });
        } else {
          Utilities.displayToast('error', 'Product Already Added');
        }
        this.form.get('code')?.reset();
        this.form.get('quantityPurchased')?.reset();
        this.form.get('cost')?.reset();
        this.form.get('name')?.reset();
        this.form.get('product')?.reset();

        break;
      case 'Update Product':
        this.quantity =
          this.quantity + +this.form.get('quantityPurchased')?.value;
        this.products$.subscribe((res) => {
          product = res.find(
            (pro) => pro.code === this.form.get('code')?.value
          );
        });
        this.form.get('product')?.patchValue(product?.id);
        this.productToBeSubmitted[this.updateIndex] = {
          code: this.form.get('code')?.value,
          quantityPurchased: this.form.get('quantityPurchased')?.value,
          product: this.form.get('product')?.value,
          cost:
            this.form.get('cost')?.value *
            this.form.get('quantityPurchased')?.value,
          value:
            this.form.get('cost')?.value *
            this.form.get('quantityPurchased')?.value,
          description: this.form.get('name')?.value,
          quantity: this.form.get('quantityPurchased')?.value,
        };
        this.form.get('code')?.reset();
        this.form.get('quantityPurchased')?.reset();
        this.form.get('cost')?.reset();
        this.form.get('name')?.reset();
        this.form.get('product')?.reset();
        this.btnText = 'Add Product';
        break;

      default:
        break;
    }
  }

  onCreateDocument() {
    this.formValue.emit({
      creditor: this.form.get('creditor')?.value,
      totalAmount: this.calculateTotal(this.productToBeSubmitted),
      totalQty: this.calculateQuantity(this.productToBeSubmitted),
      products: this.productToBeSubmitted,
      reference: this.form.get('reference')?.value,
    });
  }

  updateProduct(product: any, index: any) {
    this.btnText = 'Update Product';
    this.updateIndex = index;
    this.form.get('code')?.patchValue(product.code);
    this.form.get('quantityPurchased')?.patchValue(product.quantityPurchased);
    this.form.get('cost')?.patchValue(product.cost / product.quantityPurchased);
    this.form.get('name')?.patchValue(product.description);
    this.form.get('product')?.patchValue(product.product);
    this.cost = this.cost - product.cost * product.quantityPurchased; // TODO
  }

  removeProduct(product: any) {
    this.productToBeSubmitted.splice(product, 1);
    this.purchaseOrderProducts.splice(product, 1);
  }

  calculateTotal(array: any) {
    const arr = new SumArray(array);
    return arr.sum;
  }

  calculateQuantity(array: any) {
    const arr = new SumQuantity(array);
    return arr.sum;
  }
}

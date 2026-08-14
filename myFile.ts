import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsEntity } from '@pos-frontend/products/data-access';

@Component({
  selector: 'pos-frontend-stock-take-form',
  templateUrl: './stock-take-form.component.html',
  styleUrls: ['./stock-take-form.component.scss'],
})
export class StockTakeFormComponent implements OnInit {
  @Input() products: ProductsEntity[] = [];
  @Output() formValue = new EventEmitter();
  form!: FormGroup;
  selectedProducts: any[] = [];
  buttonMessage = 'Add Product';
  selectedUpdateIndex!: number;
  isUpdate = false;
  errorMessage = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      code: ['', Validators.required],
      productName: [''],
      quantity: ['', Validators.required],
      id: '',
    });
  }

  addProduct() {
    const productIdex = this.selectedProducts.findIndex(
      (p) => (p.code = this.form.get('code')?.value)
    );


    if (this.isUpdate) {
      const product = this.products.find(
        (product) => product.code === this.form.get('code')?.value
      );
      this.form.get('productName')?.patchValue(product?.name);
      this.form.get('id')?.patchValue(product?.id);
      this.selectedProducts.splice(
        this.selectedUpdateIndex,
        1,
        this.form.value
      );
      this.buttonMessage = 'Add Product';
      this.isUpdate = false;
      this.selectedUpdateIndex = -1
      this.form.reset();
    } else {
    
      const product = this.products.find(
        (product) => product.code === this.form.get('code')?.value
      );
      this.form.get('productName')?.patchValue(product?.name);
      this.form.get('code')?.patchValue(product?.code);
      this.form.get('id')?.patchValue(product?.id);
      this.selectedProducts.push(this.form.value);
      this.form.reset();
    }
  }

  onSubmit() {
    this.formValue.emit({ products: this.selectedProducts });
  }

  deleteProduct(productCode: any) {
    const i = this.selectedProducts.findIndex(
      (p: any) => (p.code = productCode)
    );
    this.selectedProducts.splice(i, 1);
  }

  updateProduct(product: any) {
    const i = this.selectedProducts.findIndex(
      (p: any) => (p.code = product.code)
    );
    this.selectedUpdateIndex = i;

    this.isUpdate = true;
    if (i >= 0) {
      this.buttonMessage = 'Update Product';
      this.form.patchValue(product);
    }
  }
}

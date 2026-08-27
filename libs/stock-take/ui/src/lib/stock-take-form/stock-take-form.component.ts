import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsEntity } from '@pos-frontend/products/data-access';

@Component({
    selector: 'pos-frontend-stock-take-form',
    templateUrl: './stock-take-form.component.html',
    styleUrls: ['./stock-take-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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

  toAddProduct() {
    const product = this.products.find(
      (product) => product.code === this.form.get('code')?.value
    );
    this.form.get('productName')?.patchValue(product?.name);
    this.form.get('id')?.patchValue(product?.id);
    this.selectedProducts.push(this.form.value);
    this.form.reset();
  }

  toUpdateProduct() {
    const product = this.products.find(
      (product) => product.code === this.form.get('code')?.value
    );
    this.form.get('productName')?.patchValue(product?.name);
    this.form.get('id')?.patchValue(product?.id);
    this.selectedProducts.splice(this.selectedUpdateIndex, 1, this.form.value);
    this.buttonMessage = 'Add Product';
    this.isUpdate = false;
    this.selectedUpdateIndex = -1;
    this.form.reset();
  }

  addProduct() {

    if (this.buttonMessage === 'Add Product') {
      const productIndex = this.selectedProducts.findIndex(
        (product) => product.code === this.form.get('code')?.value
      );

      if(productIndex>=0){
        this.errorMessage = 'Product already exists on line ' + (productIndex+1).toString()
        
      }else{
        this.errorMessage = ''
        this.toAddProduct();
      }
      
    }
    if (this.buttonMessage === 'Update Product') {
      this.toUpdateProduct();
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

  updateProduct(index: number, product: any) {
    this.selectedUpdateIndex = index;
    this.isUpdate = true;
    this.buttonMessage = 'Update Product';
    this.form.patchValue(product);
  }

  disableIfProductExists(productCode: any) {
   return  this.selectedProducts.findIndex(
      (p: any) => (p.productCode === productCode)
    ) != -1
   
  }
}

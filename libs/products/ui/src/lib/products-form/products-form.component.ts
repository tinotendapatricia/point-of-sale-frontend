import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CategoriesEntity } from '@pos-frontend/categories/data-access';
import { ProductsEntity } from '@pos-frontend/products/data-access';

@Component({
    selector: 'pos-frontend-products-form',
    templateUrl: './products-form.component.html',
    styleUrls: ['./products-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatButtonModule, MatProgressSpinnerModule]
})
export class ProductsFormComponent implements OnInit {
  @Input() product!: ProductsEntity;
  @Input() loading = false;
  @Input() currency!: string | undefined;
  @Input() title = '';
  @Output() formValue = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  @Input() categories: CategoriesEntity[] = [];
  @Input() btnTitle!: string;
  public productForm!: UntypedFormGroup;
  measures = ['Litres', 'Kilograms', 'Millilitres'];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  public createForm() {
    this.productForm = this.formBuilder.group({
      id: '',
      name: '',
      code: '',
      barcode: '',
      active: [false, Validators.required],
      taxable: '',
    });
  }
}

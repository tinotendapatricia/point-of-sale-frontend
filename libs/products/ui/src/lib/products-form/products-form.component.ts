import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClrLoadingState } from '@clr/angular';
import { CategoriesEntity } from '@pos-frontend/categories/data-access';
import { ProductsEntity } from '@pos-frontend/products/data-access';

@Component({
    selector: 'pos-frontend-products-form',
    templateUrl: './products-form.component.html',
    styleUrls: ['./products-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ProductsFormComponent implements OnInit{
  @Input() product!: ProductsEntity;
  @Input() btnState = ClrLoadingState.DEFAULT;
  @Input() currency!: string | undefined;
  @Input() title = '';
  @Output() formValue = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  @Input() categories:CategoriesEntity[]=[]
  //@Input() allGroups$!: Observable<GroupsEntity[]>;
  @Input() btnTitle!: string;
  public productForm!: UntypedFormGroup;
  public opened = true;
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

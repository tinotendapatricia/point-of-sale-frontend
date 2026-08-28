import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { ProductsEntity } from '@pos-frontend/products/data-access';
import { ClrModalModule } from '@clr/angular/modal';
import { ClrInputModule } from '@clr/angular/forms/input';
import { ClrCommonFormsModule } from '@clr/angular/forms/common';
import { ClrLoadingButtonModule } from '@clr/angular/button';
import { ClrLoadingModule } from '@clr/angular/utils';

@Component({
    selector: 'pos-frontend-update-cost-and-price',
    templateUrl: './update-cost-and-price.component.html',
    styleUrls: ['./update-cost-and-price.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrModalModule, FormsModule, ReactiveFormsModule, ClrInputModule, ClrCommonFormsModule, ClrLoadingButtonModule, ClrLoadingModule]
})
export class UpdateCostAndPriceComponent implements OnInit { 
  @Input() product!: ProductsEntity;
  @Input() btnState = ClrLoadingState.DEFAULT;
  @Input() title = '';
  @Output() formValue = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  @Input() label=''
  //@Input() allGroups$!: Observable<GroupsEntity[]>;
  @Input() btnTitle!: string;
  public form!: UntypedFormGroup;
  public opened = true;
  @Input() isCost = false
  @Input() isPrice = false
  measures = ['Litres', 'Kilograms', 'Millilitres'];

  constructor(private formBuilder: FormBuilder) {}
  ngOnChanges(changes: SimpleChanges): void {
    /*if (changes['currency']?.currentValue) {
      this.form.get('currency')?.patchValue(this.currency);
    }*/
  }

  ngOnInit(): void {
    this.createForm();
    if (this.product) {
      this.form.get('id')?.patchValue(this.product.id);
    }
  }

  public createForm() {
    this.form = this.formBuilder.group({
      id: '',
      price: '',
      cost:'',
      currency: [{ disabled: true, value: '' }],
      effectiveDate:''
    });
  }
}

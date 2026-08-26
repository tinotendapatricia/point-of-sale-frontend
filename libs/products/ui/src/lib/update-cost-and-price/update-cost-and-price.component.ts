import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { ProductsEntity } from '@pos-frontend/products/data-access';

@Component({
    selector: 'pos-frontend-update-cost-and-price',
    templateUrl: './update-cost-and-price.component.html',
    styleUrls: ['./update-cost-and-price.component.scss'],
    standalone: false
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

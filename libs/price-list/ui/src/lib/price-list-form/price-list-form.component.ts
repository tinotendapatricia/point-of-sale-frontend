import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pos-frontend-price-list-form',
  templateUrl: './price-list-form.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./price-list-form.component.scss'],
})
export class PriceListFormComponent   {

  /* @Input() priceList!: GroupsEntity;
    @Input() btnState = ClrLoadingState.DEFAULT;
    @Input() title = '';
    @Output() formValue = new EventEmitter();
    @Output() closeModal = new EventEmitter();
    @Input() btnTitle!: string;
    public priceListForm!: UntypedFormGroup;
    public opened = true;
  
    constructor(private formBuilder: FormBuilder) {}
  
    ngOnInit(): void {
      this.createForm();
      if (this.priceList) {
        this.priceListForm.patchValue(this.priceList);
      }
    }
  
    public createForm() {
      this.priceListForm = this.formBuilder.priceList({
        name: '',
        id: '',
      });
    }*/
}

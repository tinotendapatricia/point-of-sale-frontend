import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { CurrenciesEntity } from '@pos-frontend/currencies/data-access';

@Component({
    selector: 'pos-frontend-currency-form',
    templateUrl: './currency-form.component.html',
    styleUrls: ['./currency-form.component.scss'],
    standalone: false
})
export class CurrencyFormComponent implements OnInit {
  @Input() currency!: CurrenciesEntity;
  @Input() btnState = ClrLoadingState.DEFAULT;
  @Input() title = '';
  @Output() formValue = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  @Input() btnTitle!: string;
  public currencyForm!: UntypedFormGroup;
  public opened = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    if (this.currency) {
      this.currencyForm.patchValue(this.currency);
    }
  }

  public createForm() {
    this.currencyForm = this.formBuilder.group({
      name: '',
      code: '',
      active: '',
      isDefault: false,
      id: '',
    });
  }
}

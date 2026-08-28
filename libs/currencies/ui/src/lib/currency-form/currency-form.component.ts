import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { CurrenciesEntity } from '@pos-frontend/currencies/data-access';
import { ClrModalModule } from '@clr/angular/modal';
import { ClrInputModule } from '@clr/angular/forms/input';
import { ClrCommonFormsModule } from '@clr/angular/forms/common';
import { ClrRadioModule } from '@clr/angular/forms/radio';
import { ClrLoadingButtonModule } from '@clr/angular/button';
import { ClrLoadingModule } from '@clr/angular/utils';

@Component({
    selector: 'pos-frontend-currency-form',
    templateUrl: './currency-form.component.html',
    styleUrls: ['./currency-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrModalModule, FormsModule, ReactiveFormsModule, ClrInputModule, ClrCommonFormsModule, ClrRadioModule, ClrLoadingButtonModule, ClrLoadingModule]
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

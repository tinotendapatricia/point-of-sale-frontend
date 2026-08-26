import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup, FormBuilder } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { CurrenciesEntity } from '@pos-frontend/currencies/data-access';
import { DebtorsEntity } from '@pos-frontend/debtors/data-access';

@Component({
    selector: 'pos-frontend-debtors-form',
    templateUrl: './debtors-form.component.html',
    styleUrls: ['./debtors-form.component.scss'],
    standalone: false
})
export class DebtorsFormComponent {
  @Input() debtor!: DebtorsEntity;
  @Input() btnState = ClrLoadingState.DEFAULT;
  @Input() title = '';
  @Output() formValue = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  @Input() btnTitle!: string;
  @Input() currencies!: CurrenciesEntity[];
  public debtorForm!: UntypedFormGroup;
  public opened = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    if (this.debtor) {
      this.debtorForm.patchValue(this.debtor);
      this.debtorForm.get("currency")?.patchValue(this.debtor.currency.id)
    }
  }

  public createForm() {
    this.debtorForm = this.formBuilder.group({
      name: '',
      account: '',
      discount: '',
      currency: '',
      id: '',
    });
  }
}

import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { CurrenciesEntity } from '@pos-frontend/currencies/data-access';
import { DebtorsEntity } from '@pos-frontend/debtors/data-access';
import { ClrModalModule } from '@clr/angular/modal';
import { ClrInputModule } from '@clr/angular/forms/input';
import { ClrCommonFormsModule } from '@clr/angular/forms/common';
import { ClrSelectModule } from '@clr/angular/forms/select';
import { ClrLoadingButtonModule } from '@clr/angular/button';
import { ClrLoadingModule } from '@clr/angular/utils';

@Component({
    selector: 'pos-frontend-debtors-form',
    templateUrl: './debtors-form.component.html',
    styleUrls: ['./debtors-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrModalModule, FormsModule, ReactiveFormsModule, ClrInputModule, ClrCommonFormsModule, ClrSelectModule, ClrLoadingButtonModule, ClrLoadingModule]
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

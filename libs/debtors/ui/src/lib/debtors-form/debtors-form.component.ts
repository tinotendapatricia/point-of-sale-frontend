import { Component, ChangeDetectionStrategy, inject, input, output, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrenciesEntity } from '@pos-frontend/currencies/data-access';
import { DebtorsEntity } from '@pos-frontend/debtors/data-access';

@Component({
    selector: 'pos-frontend-debtors-form',
    templateUrl: './debtors-form.component.html',
    styleUrls: ['./debtors-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule]
})
export class DebtorsFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<unknown>, { optional: true });

  readonly debtor = input<DebtorsEntity>();
  readonly loading = input(false);
  readonly title = input('');
  readonly btnTitle = input('Submit');
  readonly currencies = input<CurrenciesEntity[]>([]);
  readonly formValue = output<any>();

  readonly debtorForm = this.formBuilder.group({
    name: [''],
    account: [''],
    discount: [''],
    currency: [''],
    id: [''],
  });

  constructor() {
    effect(() => {
      const debtor = this.debtor();
      if (debtor) {
        this.debtorForm.patchValue({
          name: debtor.name,
          account: debtor.account,
          discount: String(debtor.discount),
          id: String(debtor.id),
        });
        this.debtorForm.get('currency')?.patchValue(debtor.currency.id);
      }
    });
  }

  cancel() {
    this.dialogRef?.close(false);
  }

  submit() {
    this.formValue.emit(this.debtorForm.value);
  }
}

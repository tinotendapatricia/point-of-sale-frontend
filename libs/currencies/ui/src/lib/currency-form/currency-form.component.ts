import { Component, ChangeDetectionStrategy, inject, input, output, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrenciesEntity } from '@pos-frontend/currencies/data-access';

@Component({
    selector: 'pos-frontend-currency-form',
    templateUrl: './currency-form.component.html',
    styleUrls: ['./currency-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatButtonModule, MatProgressSpinnerModule]
})
export class CurrencyFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<unknown>, { optional: true });

  readonly currency = input<CurrenciesEntity>();
  readonly loading = input(false);
  readonly title = input('');
  readonly btnTitle = input('Submit');
  readonly formValue = output<any>();

  readonly currencyForm = this.formBuilder.group({
    name: [''],
    code: [''],
    active: [true],
    isDefault: [false],
    id: [''],
  });

  constructor() {
    effect(() => {
      const currency = this.currency();
      if (currency) {
        this.currencyForm.patchValue({ ...currency, id: String(currency.id) });
      }
    });
  }

  cancel() {
    this.dialogRef?.close(false);
  }

  submit() {
    this.formValue.emit(this.currencyForm.value);
  }
}

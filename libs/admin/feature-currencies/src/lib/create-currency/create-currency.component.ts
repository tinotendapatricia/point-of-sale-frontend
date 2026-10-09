import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  type CurrencyEntity,
  CurrencyStore,
} from '@pos-frontend/currencies/data-access';
import { DialogHeaderComponent } from '@pos-frontend/shared/ui';

export interface CreateCurrencyData {
  /** Present when editing an existing currency; omit to create a new one. */
  currency?: CurrencyEntity;
}

/** Create/update dialog: opened through MatDialog from the currencies list. */
@Component({
  selector: 'pos-frontend-create-currency',
  templateUrl: './create-currency.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    DialogHeaderComponent,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
})
export class CreateCurrencyComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef =
    inject<MatDialogRef<CreateCurrencyComponent, boolean>>(MatDialogRef);
  private readonly data = inject<CreateCurrencyData | null>(MAT_DIALOG_DATA, {
    optional: true,
  });
  private readonly currencyStore = inject(CurrencyStore);

  protected readonly currency = this.data?.currency;
  protected readonly title = this.currency ? 'Update Currency' : 'New Currency';
  protected readonly submitLabel = this.currency ? 'Update' : 'Create';
  protected readonly loading = computed(() =>
    this.currency
      ? this.currencyStore.updateLoading()
      : this.currencyStore.createLoading()
  );

  protected readonly form = this.fb.group({
    name: [this.currency?.name ?? '', Validators.required],
    code: [this.currency?.code ?? '', Validators.required],
    symbol: [this.currency?.symbol ?? '', Validators.required],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const callback = () => this.dialogRef.close(true);

    if (this.currency) {
      this.currencyStore.updateCurrency({
        data: { ...this.currency, ...value },
        callback,
      });
    } else {
      this.currencyStore.createCurrency({
        data: { ...value, isDefault: false },
        callback,
      });
    }
  }
}

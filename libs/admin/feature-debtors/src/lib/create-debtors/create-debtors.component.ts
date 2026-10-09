import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { type DebtorsEntity, DebtorStore } from '@pos-frontend/debtors/data-access';
import { DialogHeaderComponent } from '@pos-frontend/shared/ui';

export interface CreateDebtorsData {
  /** Present when editing an existing debtor; omit to create a new one. */
  debtor?: DebtorsEntity;
}

/** Create/update dialog: opened through MatDialog from the debtors list. */
@Component({
  selector: 'pos-frontend-create-debtors',
  templateUrl: './create-debtors.component.html',
  styleUrl: './create-debtors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    DialogHeaderComponent,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
})
export class CreateDebtorsComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef = inject<MatDialogRef<CreateDebtorsComponent, boolean>>(MatDialogRef);
  private readonly data = inject<CreateDebtorsData | null>(MAT_DIALOG_DATA, { optional: true });
  private readonly debtorStore = inject(DebtorStore);
  private readonly currencyStore = inject(CurrencyStore);

  protected readonly debtor = this.data?.debtor;
  protected readonly currencies = this.currencyStore.currencies;
  protected readonly title = this.debtor ? 'Update Debtor' : 'New Debtor';
  protected readonly submitLabel = this.debtor ? 'Update' : 'Create';
  protected readonly loading = computed(() =>
    this.debtor ? this.debtorStore.updateLoading() : this.debtorStore.createLoading(),
  );

  protected readonly form = this.fb.group({
    name: [this.debtor?.name ?? '', Validators.required],
    account: [this.debtor?.account ?? '', Validators.required],
    currency: this.fb.control<string | number | null>(this.debtor?.currency?.id ?? null, Validators.required),
    discount: [this.debtor?.discount ?? 0, [Validators.min(0), Validators.max(100)]],
  });

  constructor() {
    this.currencyStore.getAllCurrencies();
  }

  protected submit(): void {
    const { currency, ...rest } = this.form.getRawValue();
    if (this.form.invalid || currency === null) {
      this.form.markAllAsTouched();
      return;
    }

    const value = { ...rest, currency };
    const callback = () => this.dialogRef.close(true);

    if (this.debtor) {
      this.debtorStore.updateDebtor({ data: { ...value, id: this.debtor.id }, callback });
    } else {
      this.debtorStore.createDebtor({ data: value, callback });
    }
  }
}

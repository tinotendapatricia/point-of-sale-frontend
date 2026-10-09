import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

export interface UpdateRateData {
  currency: CurrencyEntity;
}

/** Rate dialog: opened through MatDialog from the currencies list. */
@Component({
  selector: 'pos-frontend-update-rate',
  templateUrl: './update-rate.component.html',
  styleUrl: './update-rate.component.scss',
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
export class UpdateRateComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef =
    inject<MatDialogRef<UpdateRateComponent, boolean>>(MatDialogRef);
  private readonly data = inject<UpdateRateData>(MAT_DIALOG_DATA);
  private readonly currencyStore = inject(CurrencyStore);

  protected readonly currency = this.data.currency;
  protected readonly loading = this.currencyStore.updateRateLoading;

  protected readonly form = this.fb.group({
    rate: [this.currency.rate, [Validators.required, Validators.min(0)]],
    effectiveDate: [''],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.currencyStore.updateRate({
      data: { ...this.form.getRawValue(), id: this.currency.id },
      callback: () => this.dialogRef.close(true),
    });
  }
}

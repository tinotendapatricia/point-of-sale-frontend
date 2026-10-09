import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import {
  type AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';
import type { DebtorsEntity } from '@pos-frontend/debtors/data-access';
import type { ProductsEntity } from '@pos-frontend/products/data-access';

/** Everything the report filter form can collect; the container picks what its report needs. */
export interface ReportFormValue {
  /** yyyy-MM-dd, as produced by a native date input. */
  fromDate: string;
  toDate: string;
  /** null means "all debtors". */
  debtor: string | number | null;
  /** null means "all products". */
  product: string | number | null;
  orderNumber: number | null;
  grvNumber: number | null;
  batchNumber: number | null;
  adjustmentNumber: number | null;
  /** false: open the report in a new tab ("View report"); true: save the file. */
  download: boolean;
}

@Component({
  selector: 'pos-frontend-reports-form',
  templateUrl: './reports-form.component.html',
  styleUrl: './reports-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NgSelectComponent,
    NgOptionComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class ReportsFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly loading = input(false);
  readonly debtors = input<DebtorsEntity[]>([]);
  readonly products = input<ProductsEntity[]>([]);
  readonly isDate = input(false);
  readonly isDebtor = input(false);
  readonly isProduct = input(false);
  readonly isOrderNumber = input(false);
  readonly isGrvNumber = input(false);
  readonly isBatch = input(false);
  readonly isAdjustmentNumber = input(false);
  readonly isExcel = input(false);

  readonly pdfRequested = output<ReportFormValue>();
  readonly excelRequested = output<ReportFormValue>();

  protected readonly form = this.fb.group({
    fromDate: [''],
    toDate: [''],
    debtor: this.fb.control<string | number | null>(null),
    product: this.fb.control<string | number | null>(null),
    orderNumber: this.fb.control<number | null>(null),
    grvNumber: this.fb.control<number | null>(null),
    batchNumber: this.fb.control<number | null>(null),
    adjustmentNumber: this.fb.control<number | null>(null),
  });

  protected readonly controls = this.form.controls;

  /** The single-number lookups (order, GRV, batch, adjustment) that this report shows. */
  protected readonly numberFields = computed(() =>
    [
      { id: 'report-order-number', label: 'Purchase Order Number', control: this.controls.orderNumber, shown: this.isOrderNumber() },
      { id: 'report-grv-number', label: 'GRV Number', control: this.controls.grvNumber, shown: this.isGrvNumber() },
      { id: 'report-batch-number', label: 'Batch Number', control: this.controls.batchNumber, shown: this.isBatch() },
      { id: 'report-adjustment-number', label: 'Adjustment Number', control: this.controls.adjustmentNumber, shown: this.isAdjustmentNumber() },
    ].filter(field => field.shown)
  );

  constructor() {
    // Only the fields that are shown are required; debtor and product stay optional ("all").
    effect(() => {
      const { fromDate, toDate, orderNumber, grvNumber, batchNumber, adjustmentNumber } =
        this.controls;
      this.setRequired(fromDate, this.isDate());
      this.setRequired(toDate, this.isDate());
      this.setRequired(orderNumber, this.isOrderNumber());
      this.setRequired(grvNumber, this.isGrvNumber());
      this.setRequired(batchNumber, this.isBatch());
      this.setRequired(adjustmentNumber, this.isAdjustmentNumber());
    });
  }

  /** "View report" opens the PDF in a new tab; the PDF button saves it. */
  protected requestPdf(download: boolean): void {
    if (this.isValid()) {
      this.pdfRequested.emit({ ...this.form.getRawValue(), download });
    }
  }

  protected requestExcel(): void {
    if (this.isValid()) {
      this.excelRequested.emit({ ...this.form.getRawValue(), download: true });
    }
  }

  private isValid(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  private setRequired(control: AbstractControl, required: boolean): void {
    if (required) {
      control.addValidators(Validators.required);
    } else {
      control.removeValidators(Validators.required);
    }
    control.updateValueAndValidity({ emitEvent: false });
  }
}

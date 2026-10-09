import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { type CreditorsEntity, CreditorStore } from '@pos-frontend/creditors/data-access';
import { DialogHeaderComponent } from '@pos-frontend/shared/ui';

export interface CreateCreditorsData {
  /** Present when editing an existing creditor; omit to create a new one. */
  creditor?: CreditorsEntity;
}

/** Create/update dialog: opened through MatDialog from the creditors list. */
@Component({
  selector: 'pos-frontend-create-creditors',
  templateUrl: './create-creditors.component.html',
  styleUrl: './create-creditors.component.scss',
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
export class CreateCreditorsComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef = inject<MatDialogRef<CreateCreditorsComponent, boolean>>(MatDialogRef);
  private readonly data = inject<CreateCreditorsData | null>(MAT_DIALOG_DATA, { optional: true });
  private readonly creditorStore = inject(CreditorStore);

  protected readonly creditor = this.data?.creditor;
  protected readonly title = this.creditor ? 'Update Creditor' : 'New Creditor';
  protected readonly submitLabel = this.creditor ? 'Update' : 'Create';
  protected readonly loading = computed(() =>
    this.creditor ? this.creditorStore.updateLoading() : this.creditorStore.createLoading(),
  );

  protected readonly form = this.fb.group({
    account: [this.creditor?.account ?? '', Validators.required],
    name: [this.creditor?.name ?? '', Validators.required],
    address: [this.creditor?.address ?? ''],
    description: [this.creditor?.description ?? ''],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const callback = () => this.dialogRef.close(true);

    if (this.creditor) {
      this.creditorStore.updateCreditor({ data: { ...value, id: this.creditor.id }, callback });
    } else {
      this.creditorStore.createCreditor({ data: value, callback });
    }
  }
}

import { Component, ChangeDetectionStrategy, inject, input, output, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreditorsEntity } from '@pos-frontend/creditors/data-access';

@Component({
    selector: 'pos-frontend-creditors-form',
    templateUrl: './creditors-form.component.html',
    styleUrls: ['./creditors-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule]
})
export class CreditorsFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<unknown>, { optional: true });

  readonly creditor = input<CreditorsEntity>();
  readonly loading = input(false);
  readonly title = input('');
  readonly btnTitle = input('Submit');
  readonly formValue = output<any>();

  readonly creditorForm = this.formBuilder.group({
    name: [''],
    account: [''],
    address: [''],
    description: [''],
    id: [''],
  });

  constructor() {
    effect(() => {
      const creditor = this.creditor();
      if (creditor) {
        this.creditorForm.patchValue({ ...creditor, id: String(creditor.id) });
      }
    });
  }

  cancel() {
    this.dialogRef?.close(false);
  }

  submit() {
    this.formValue.emit(this.creditorForm.value);
  }
}

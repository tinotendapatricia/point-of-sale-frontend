import { Component, inject, input, output, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'pos-frontend-action-confirmation-form',
    templateUrl: './action-confirmation-form.component.html',
    styleUrls: ['./action-confirmation-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatDialogModule, MatButtonModule, MatProgressSpinnerModule]
})
export class ActionConfirmationFormComponent {
  private readonly dialogRef = inject(MatDialogRef<ActionConfirmationFormComponent>, { optional: true });

  readonly loading = input(false);
  readonly message = input('');
  readonly title = input('');
  readonly proceed = output<void>();
  /** @deprecated only used by callers that still embed this component directly instead of opening it via MatDialog. */
  readonly closeModal = output<boolean>();

  cancel() {
    this.dialogRef?.close(false);
    this.closeModal.emit(false);
  }
}

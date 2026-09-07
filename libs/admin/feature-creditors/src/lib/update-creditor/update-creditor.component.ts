import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreditorsEntity, CreditorsFacade } from '@pos-frontend/creditors/data-access';
import { CreditorsFormComponent } from '@pos-frontend/creditors/ui';

export interface UpdateCreditorData {
  creditor: CreditorsEntity;
}

@Component({
    selector: 'pos-frontend-update-creditor',
    templateUrl: './update-creditor.component.html',
    styleUrls: ['./update-creditor.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CreditorsFormComponent]
})
export class UpdateCreditorComponent {
  private readonly dialogRef = inject(MatDialogRef<UpdateCreditorComponent, boolean>);
  private readonly data = inject<UpdateCreditorData>(MAT_DIALOG_DATA);
  readonly creditorsService = inject(CreditorsFacade);

  readonly creditor = this.data.creditor;
  readonly submitting = signal(false);

  public createCreditor(creditor: any) {
    this.submitting.set(true);
    this.creditorsService.updateCreditor(creditor);
    this.creditorsService.loaded$.pipe(take(1)).subscribe((loaded) => {
      this.submitting.set(false);
      if (loaded) {
        this.dialogRef.close(true);
      }
    });
  }
}

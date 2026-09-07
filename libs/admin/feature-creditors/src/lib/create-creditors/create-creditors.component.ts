import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { CreditorsFacade } from '@pos-frontend/creditors/data-access';
import { CreditorsFormComponent } from '@pos-frontend/creditors/ui';

@Component({
    selector: 'pos-frontend-create-creditors',
    templateUrl: './create-creditors.component.html',
    styleUrls: ['./create-creditors.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CreditorsFormComponent]
})
export class CreateCreditorsComponent {
  private readonly dialogRef = inject(MatDialogRef<CreateCreditorsComponent, boolean>);
  readonly creditorsService = inject(CreditorsFacade);

  readonly submitting = signal(false);

  public createCreditor(creditor: any) {
    this.submitting.set(true);
    this.creditorsService.createNewCreditor(creditor);
    this.creditorsService.loaded$.pipe(take(1)).subscribe((loaded) => {
      this.submitting.set(false);
      if (loaded) {
        this.dialogRef.close(true);
      }
    });
  }
}

import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { VatFacade } from '@pos-frontend/vat/data-access';
import { VatFormComponent } from '@pos-frontend/vat/ui';

@Component({
    selector: 'pos-frontend-update-vat',
    templateUrl: './update-vat.component.html',
    styleUrls: ['./update-vat.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [VatFormComponent, AsyncPipe]
})
export class UpdateVatComponent {
  private readonly dialogRef = inject(MatDialogRef<UpdateVatComponent, boolean>);
  readonly vatFacade = inject(VatFacade);

  readonly submitting = signal(false);

  public createVat(vat: any) {
    this.submitting.set(true);
    this.vatFacade.updateVat(vat);
    this.vatFacade.loaded$.pipe(take(1)).subscribe((loaded) => {
      this.submitting.set(false);
      if (loaded) {
        this.dialogRef.close(true);
      }
    });
  }
}

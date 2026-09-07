import { Component, OnInit, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AsyncPipe } from '@angular/common';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { DebtorsEntity, DebtorsFacade } from '@pos-frontend/debtors/data-access';
import { DebtorsFormComponent } from '@pos-frontend/debtors/ui';

export interface UpdateDebtorsData {
  debtor: DebtorsEntity;
}

@Component({
    selector: 'pos-frontend-update-debtors',
    templateUrl: './update-debtors.component.html',
    styleUrls: ['./update-debtors.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [DebtorsFormComponent, AsyncPipe]
})
export class UpdateDebtorsComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<UpdateDebtorsComponent, boolean>);
  private readonly data = inject<UpdateDebtorsData>(MAT_DIALOG_DATA);
  readonly debtorsService = inject(DebtorsFacade);
  readonly currenciesFacade = inject(CurrenciesFacade);

  readonly debtor = this.data.debtor;
  readonly submitting = signal(false);

  ngOnInit(): void {
    this.currenciesFacade.getAllCurrencies();
  }

  public createDebtor(debtor: any) {
    this.submitting.set(true);
    this.debtorsService.updateDebtor(debtor);
    this.debtorsService.loaded$.pipe(take(1)).subscribe((loaded) => {
      this.submitting.set(false);
      if (loaded) {
        this.dialogRef.close(true);
      }
    });
  }
}

import { Component, OnInit, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { AsyncPipe } from '@angular/common';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { DebtorsFacade } from '@pos-frontend/debtors/data-access';
import { DebtorsFormComponent } from '@pos-frontend/debtors/ui';

@Component({
    selector: 'pos-frontend-create-debtors',
    templateUrl: './create-debtors.component.html',
    styleUrls: ['./create-debtors.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [DebtorsFormComponent, AsyncPipe]
})
export class CreateDebtorsComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<CreateDebtorsComponent, boolean>);
  readonly debtorsService = inject(DebtorsFacade);
  readonly currenciesFacade = inject(CurrenciesFacade);

  readonly submitting = signal(false);

  ngOnInit(): void {
    this.currenciesFacade.getAllCurrencies();
  }

  public createDebtor(debtor: any) {
    this.submitting.set(true);
    this.debtorsService.createNewDebtor(debtor);
    this.debtorsService.loaded$.pipe(take(1)).subscribe((loaded) => {
      this.submitting.set(false);
      if (loaded) {
        this.dialogRef.close(true);
      }
    });
  }
}

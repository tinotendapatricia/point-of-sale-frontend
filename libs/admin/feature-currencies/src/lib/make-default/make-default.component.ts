import { Component, OnInit, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  CurrenciesEntity,
  CurrenciesFacade,
} from '@pos-frontend/currencies/data-access';
import { ActionConfirmationFormComponent } from '@pos-frontend/shared/ui';

export interface MakeDefaultData {
  currency: CurrenciesEntity;
}

@Component({
    selector: 'pos-frontend-make-default',
    templateUrl: './make-default.component.html',
    styleUrls: ['./make-default.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ActionConfirmationFormComponent]
})
export class MakeDefaultComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<MakeDefaultComponent, boolean>);
  private readonly data = inject<MakeDefaultData>(MAT_DIALOG_DATA);
  readonly currenciesService = inject(CurrenciesFacade);

  private readonly currency = this.data.currency;
  message = '';
  readonly submitting = signal(false);

  ngOnInit(): void {
    this.message = ` Are you sure you want to make ${this.currency.code} the default system currency?`;
  }

  public onSubmit() {
    this.submitting.set(true);
    this.currenciesService.makeDefault(this.currency);
    this.currenciesService.loaded$.pipe(take(1)).subscribe((loaded) => {
      this.submitting.set(false);
      if (loaded) {
        this.dialogRef.close(true);
      }
    });
  }
}

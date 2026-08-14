import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDebtors from './+state/debtors.reducer';
import { DebtorsEffects } from './+state/debtors.effects';
import { DebtorsFacade } from './+state/debtors.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromDebtors.DEBTORS_FEATURE_KEY,
      fromDebtors.debtorsReducer
    ),
    EffectsModule.forFeature([DebtorsEffects]),
  ],
  providers: [DebtorsFacade],
})
export class DebtorsDataAccessModule {}

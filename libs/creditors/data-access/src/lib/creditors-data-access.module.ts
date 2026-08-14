import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCreditors from './+state/creditors.reducer';
import { CreditorsEffects } from './+state/creditors.effects';
import { CreditorsFacade } from './+state/creditors.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCreditors.CREDITORS_FEATURE_KEY,
      fromCreditors.creditorsReducer
    ),
    EffectsModule.forFeature([CreditorsEffects]),
  ],
  providers: [CreditorsFacade],
})
export class CreditorsDataAccessModule {}

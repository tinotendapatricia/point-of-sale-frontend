import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromVat from './+state/vat.reducer';
import { VatEffects } from './+state/vat.effects';
import { VatFacade } from './+state/vat.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromVat.VAT_FEATURE_KEY, fromVat.vatReducer),
    EffectsModule.forFeature([VatEffects]),
  ],
  providers: [VatFacade],
})
export class VatDataAccessModule {}

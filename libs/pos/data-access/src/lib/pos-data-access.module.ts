import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPos from './+state/pos.reducer';
import { PosEffects } from './+state/pos.effects';
import { PosFacade } from './+state/pos.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromPos.POS_FEATURE_KEY, fromPos.posReducer),
    EffectsModule.forFeature([PosEffects]),
  ],
  providers: [PosFacade],
})
export class PosDataAccessModule {}

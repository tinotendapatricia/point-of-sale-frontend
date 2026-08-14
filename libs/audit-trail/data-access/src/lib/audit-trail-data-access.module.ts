import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAudits from './+state/audits.reducer';
import { AuditsEffects } from './+state/audits.effects';
import { AuditsFacade } from './+state/audits.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromAudits.AUDITS_FEATURE_KEY,
      fromAudits.auditsReducer
    ),
    EffectsModule.forFeature([AuditsEffects]),
  ],
  providers: [AuditsFacade],
})
export class AuditTrailDataAccessModule {}

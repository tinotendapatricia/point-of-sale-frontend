import { EnvironmentProviders, Provider } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromAudits from './+state/audits.reducer';
import { AuditsEffects } from './+state/audits.effects';
import { AuditsFacade } from './+state/audits.facade';

export function provideAuditTrailDataAccess(): (Provider | EnvironmentProviders)[] {
  return [
    provideState(fromAudits.AUDITS_FEATURE_KEY, fromAudits.auditsReducer),
    provideEffects(AuditsEffects),
    AuditsFacade,
  ];
}

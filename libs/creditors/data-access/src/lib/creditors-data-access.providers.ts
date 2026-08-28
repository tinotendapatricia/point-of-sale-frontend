import { EnvironmentProviders, Provider } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromCreditors from './+state/creditors.reducer';
import { CreditorsEffects } from './+state/creditors.effects';
import { CreditorsFacade } from './+state/creditors.facade';

export function provideCreditorsDataAccess(): (Provider | EnvironmentProviders)[] {
  return [
    provideState(fromCreditors.CREDITORS_FEATURE_KEY, fromCreditors.creditorsReducer),
    provideEffects(CreditorsEffects),
    CreditorsFacade,
  ];
}

import { EnvironmentProviders, Provider } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromDebtors from './+state/debtors.reducer';
import { DebtorsEffects } from './+state/debtors.effects';
import { DebtorsFacade } from './+state/debtors.facade';

export function provideDebtorsDataAccess(): (Provider | EnvironmentProviders)[] {
  return [
    provideState(fromDebtors.DEBTORS_FEATURE_KEY, fromDebtors.debtorsReducer),
    provideEffects(DebtorsEffects),
    DebtorsFacade,
  ];
}

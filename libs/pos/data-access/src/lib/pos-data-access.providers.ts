import { type EnvironmentProviders, type Provider } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromPos from './+state/pos.reducer';
import { PosEffects } from './+state/pos.effects';
import { PosFacade } from './+state/pos.facade';

export function providePosDataAccess(): (Provider | EnvironmentProviders)[] {
  return [
    provideState(fromPos.POS_FEATURE_KEY, fromPos.posReducer),
    provideEffects(PosEffects),
    PosFacade,
  ];
}

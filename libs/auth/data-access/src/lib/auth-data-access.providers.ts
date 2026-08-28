import { EnvironmentProviders, Provider } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromAuth from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';
import { AuthFacade } from './+state/auth.facade';

export function provideAuthDataAccess(): (Provider | EnvironmentProviders)[] {
  return [
    provideState(fromAuth.AUTH_FEATURE_KEY, fromAuth.authReducer),
    provideEffects(AuthEffects),
    AuthFacade,
  ];
}

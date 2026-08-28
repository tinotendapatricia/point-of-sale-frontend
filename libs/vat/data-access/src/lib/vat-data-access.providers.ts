import { EnvironmentProviders, Provider } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromVat from './+state/vat.reducer';
import { VatEffects } from './+state/vat.effects';
import { VatFacade } from './+state/vat.facade';

export function provideVatDataAccess(): (Provider | EnvironmentProviders)[] {
  return [
    provideState(fromVat.VAT_FEATURE_KEY, fromVat.vatReducer),
    provideEffects(VatEffects),
    VatFacade,
  ];
}

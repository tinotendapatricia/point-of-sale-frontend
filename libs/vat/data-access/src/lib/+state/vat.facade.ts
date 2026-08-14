import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as VatActions from './vat.actions';
import { VatEntity } from './vat.models';
import * as VatFeature from './vat.reducer';
import * as VatSelectors from './vat.selectors';

@Injectable()
export class VatFacade {
  loaded$ = this.store.pipe(select(VatSelectors.selectVatLoaded));
  allVat$ = this.store.pipe(select(VatSelectors.selectAllVat));
  selectedVat$ = this.store.pipe(select(VatSelectors.getSelectedVat));
  btnState$ = this.store.pipe(select(VatSelectors.getBtnState));

  constructor(private store: Store<VatFeature.VatPartialState>) {}

  getVat() {
    this.store.dispatch(VatActions.getVatById());
  }
  updateVat(vat: VatEntity) {
    this.store.dispatch(VatActions.updateVat(vat));
  }
}

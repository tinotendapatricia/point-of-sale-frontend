import { Injectable, inject } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { select, Store, Action } from '@ngrx/store';

import * as CreditorsActions from './creditors.actions';
import { CreditorsEntity } from './creditors.models';
import * as CreditorsFeature from './creditors.reducer';
import * as CreditorsSelectors from './creditors.selectors';

@Injectable()
export class CreditorsFacade {
  loaded$ = this.store.pipe(select(CreditorsSelectors.selectCreditorsLoaded));
  allCreditors$ = this.store.pipe(select(CreditorsSelectors.selectAllCreditors));
  selectedCreditor$ = this.store.pipe(select(CreditorsSelectors.getSelectedCreditor));
  loading$ = this.store.pipe(select(CreditorsSelectors.getCreditorsLoadingState));
  totalCreditors$ = this.store.pipe(select(CreditorsSelectors.getTotalCreditors));
  btnState$ = this.store.pipe(select(CreditorsSelectors.getBtnState));

  constructor(private store: Store<CreditorsFeature.CreditorsPartialState>) {}

  getPaginatedCreditors(state: ClrDatagridStateInterface) {
    this.store.dispatch(CreditorsActions.getPaginatedCreditors({ state }));
  }

  getAllCreditors() {
    this.store.dispatch(CreditorsActions.getAllCreditors());
  }

  getCreditor(creditorId: string | number) {
    this.store.dispatch(CreditorsActions.getCreditorById({ creditorId }));
  }

  createNewCreditor(creditor: CreditorsEntity) {
    this.store.dispatch(CreditorsActions.createCreditor(creditor));
  }

  updateCreditor(creditor: CreditorsEntity) {
    this.store.dispatch(CreditorsActions.updateCreditor(creditor));
  }

  assignCreditorRoles(creditorDetails: any) {
    this.store.dispatch(CreditorsActions.assignCreditorRoles(creditorDetails));
  }
}

import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as DebtorsActions from './debtors.actions';
import * as DebtorsFeature from './debtors.reducer';
import * as DebtorsSelectors from './debtors.selectors';
import { ClrDatagridStateInterface } from '@clr/angular';
import { DebtorsEntity } from './debtors.models';

@Injectable()
export class DebtorsFacade {
  loaded$ = this.store.pipe(select(DebtorsSelectors.selectDebtorsLoaded));
  allDebtors$ = this.store.pipe(select(DebtorsSelectors.selectAllDebtors));
  selectedDebtor$ = this.store.pipe(select(DebtorsSelectors.getSelectedDebtor));
  loading$ = this.store.pipe(select(DebtorsSelectors.getDebtorsLoadingState));
  totalDebtors$ = this.store.pipe(select(DebtorsSelectors.getTotalDebtors));
  btnState$ = this.store.pipe(select(DebtorsSelectors.getBtnState));

  constructor(private store: Store<DebtorsFeature.DebtorsPartialState>) {}

  getPaginatedDebtors(state: ClrDatagridStateInterface) {
    this.store.dispatch(DebtorsActions.getPaginatedDebtors({ state }));
  }

  getAllDebtors() {
    this.store.dispatch(DebtorsActions.getAllDebtors());
  }

  getDebtor(debtorId: string | number) {
    this.store.dispatch(DebtorsActions.getDebtorById({ debtorId }));
  }

  createNewDebtor(debtor: DebtorsEntity) {
    this.store.dispatch(DebtorsActions.createDebtor(debtor));
  }

  updateDebtor(debtor: DebtorsEntity) {
    this.store.dispatch(DebtorsActions.updateDebtor(debtor));
  }

  assignDebtorRoles(debtorDetails: any) {
    this.store.dispatch(DebtorsActions.assignDebtorRoles(debtorDetails));
  }
}

import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as AuditsActions from './audits.actions';
import * as AuditsFeature from './audits.reducer';
import * as AuditsSelectors from './audits.selectors';
import { ClrDatagridStateInterface } from '@clr/angular';

@Injectable()
export class AuditsFacade {
  loaded$ = this.store.pipe(select(AuditsSelectors.selectAuditsLoaded));
  allAudits$ = this.store.pipe(select(AuditsSelectors.selectAllAudits));
  selectedAudit$ = this.store.pipe(select(AuditsSelectors.getSelectedAudit));
  loading$ = this.store.pipe(select(AuditsSelectors.getAuditsLoadingState));
  totalAudits$ = this.store.pipe(select(AuditsSelectors.getTotalAudits));
  btnState$ = this.store.pipe(select(AuditsSelectors.getBtnState));

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  constructor(private store: Store<AuditsFeature.AuditsPartialState>) {}

  getPaginatedAudits(state: ClrDatagridStateInterface) {
    this.store.dispatch(AuditsActions.getPaginatedAudits({ state }));
  }

}

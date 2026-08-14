import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as PosActions from './pos.actions';
import * as PosFeature from './pos.reducer';
import * as PosSelectors from './pos.selectors';
import { PosEntity } from './pos.models';

@Injectable()
export class PosFacade {
  loaded$ = this.store.pipe(select(PosSelectors.selectPosLoaded));
  allPos$ = this.store.pipe(select(PosSelectors.selectAllPos));
  selectedPos$ = this.store.pipe(select(PosSelectors.getSelectedPos));
  loading$ = this.store.pipe(select(PosSelectors.getPosLoadingState));
  totalPos$ = this.store.pipe(select(PosSelectors.getTotalPos));
  btnState$ = this.store.pipe(select(PosSelectors.getBtnState));

  constructor(private store: Store<PosFeature.PosPartialState>) {}

  createNewPos(pos: PosEntity) {
    this.store.dispatch(PosActions.createPos(pos));
  }
}

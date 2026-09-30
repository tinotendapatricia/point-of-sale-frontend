import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as PosActions from './pos.actions';
import { type PosPartialState } from './pos.reducer';
import * as PosSelectors from './pos.selectors';
import { type CreateSaleRequest } from './pos.models';

@Injectable()
export class PosFacade {
  private readonly store = inject<Store<PosPartialState>>(Store);

  readonly loaded$ = this.store.pipe(select(PosSelectors.selectPosLoaded));
  readonly allPos$ = this.store.pipe(select(PosSelectors.selectAllPos));
  readonly selectedPos$ = this.store.pipe(select(PosSelectors.getSelectedPos));
  readonly loading$ = this.store.pipe(select(PosSelectors.getPosLoadingState));
  readonly totalPos$ = this.store.pipe(select(PosSelectors.getTotalPos));
  readonly btnState$ = this.store.pipe(select(PosSelectors.getBtnState));

  createNewPos(pos: CreateSaleRequest): void {
    this.store.dispatch(PosActions.createPos(pos));
  }
}

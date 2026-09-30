import { type Action } from '@ngrx/store';
import { ClrLoadingState } from '@clr/angular';

import * as PosActions from './pos.actions';
import { createInvoice, saleRequest as request } from '../../testing/pos.fixtures';
import { type PosState, initialPosState, posReducer } from './pos.reducer';

const invoice = createInvoice();

describe('Pos Reducer', () => {
  it('createPos puts the button in its loading state', () => {
    const result: PosState = posReducer(
      initialPosState,
      PosActions.createPos(request)
    );

    expect(result.btnState).toBe(ClrLoadingState.LOADING);
    expect(result.loaded).toBe(false);
  });

  it('createPosuccess stores the created invoice', () => {
    const result = posReducer(
      initialPosState,
      PosActions.createPosuccess(invoice)
    );

    expect(result.loaded).toBe(true);
    expect(result.btnState).toBe(ClrLoadingState.SUCCESS);
    expect(result.selectedPos).toBe(invoice);
  });

  it('createPosFailure keeps the error', () => {
    const error = new Error('boom');
    const result = posReducer(
      initialPosState,
      PosActions.createPosFailure({ error })
    );

    expect(result.error).toBe(error);
    expect(result.btnState).toBe(ClrLoadingState.ERROR);
  });

  it('returns the previous state for an unknown action', () => {
    const action: Action = { type: 'unknown' };

    expect(posReducer(initialPosState, action)).toBe(initialPosState);
  });
});

import { ClrLoadingState } from '@clr/angular';

import { createInvoice } from '../../testing/pos.fixtures';
import {
  posAdapter,
  type PosPartialState,
  initialPosState,
} from './pos.reducer';
import * as PosSelectors from './pos.selectors';

describe('Pos Selectors', () => {
  const error = new Error('No Error Available');
  const createPosEntity = createInvoice;
  const selected = createPosEntity('PRODUCT-BBB');

  let state: PosPartialState;

  beforeEach(() => {
    state = {
      pos: posAdapter.setAll(
        [
          createPosEntity('PRODUCT-AAA'),
          selected,
          createPosEntity('PRODUCT-CCC'),
        ],
        {
          ...initialPosState,
          selectedId: 'PRODUCT-BBB',
          selectedPos: selected,
          error,
          loaded: true,
          btnState: ClrLoadingState.SUCCESS,
        }
      ),
    };
  });

  it('selectAllPos() returns the list of Pos', () => {
    const results = PosSelectors.selectAllPos(state);

    expect(results.length).toBe(3);
    expect(results[1].id).toBe('PRODUCT-BBB');
  });

  it('getSelectedPos() returns the selected invoice', () => {
    expect(PosSelectors.getSelectedPos(state)).toBe(selected);
  });

  it('selectPosLoaded() returns the loaded flag', () => {
    expect(PosSelectors.selectPosLoaded(state)).toBe(true);
  });

  it('selectPosError() returns the error', () => {
    expect(PosSelectors.selectPosError(state)).toBe(error);
  });

  it('getBtnState() returns the button state', () => {
    expect(PosSelectors.getBtnState(state)).toBe(ClrLoadingState.SUCCESS);
  });
});

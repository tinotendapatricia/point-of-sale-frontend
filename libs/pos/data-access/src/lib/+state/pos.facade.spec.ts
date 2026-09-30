import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as PosActions from './pos.actions';
import { PosFacade } from './pos.facade';
import { saleRequest as request } from '../../testing/pos.fixtures';
import { POS_FEATURE_KEY, initialPosState } from './pos.reducer';

describe('PosFacade', () => {
  let facade: PosFacade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PosFacade,
        provideMockStore({
          initialState: { [POS_FEATURE_KEY]: initialPosState },
        }),
      ],
    });

    store = TestBed.inject(MockStore);
    facade = TestBed.inject(PosFacade);
  });

  it('createNewPos() dispatches createPos', () => {
    const dispatch = jest.spyOn(store, 'dispatch');

    facade.createNewPos(request);

    expect(dispatch).toHaveBeenCalledWith(PosActions.createPos(request));
  });

  it('loaded$ starts as false', () => {
    let loaded: boolean | undefined;
    facade.loaded$.subscribe((value) => (loaded = value));

    expect(loaded).toBe(false);
  });
});

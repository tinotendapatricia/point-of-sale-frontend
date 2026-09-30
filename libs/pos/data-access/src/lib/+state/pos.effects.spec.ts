import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { type Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { type Observable } from 'rxjs';

import { ToastService } from '@pos-frontend/core';

import * as PosActions from './pos.actions';
import { PosEffects } from './pos.effects';
import { PosService } from '../services/pos.service';
import { createInvoice, saleRequest as request } from '../../testing/pos.fixtures';

const invoice = createInvoice();

describe('PosEffects', () => {
  let actions: Observable<Action>;
  let effects: PosEffects;
  const posService = { createPos: jest.fn() };
  const toast = { success: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [
        PosEffects,
        provideMockActions(() => actions),
        { provide: PosService, useValue: posService },
        { provide: ToastService, useValue: toast },
      ],
    });

    effects = TestBed.inject(PosEffects);
  });

  it('createPos$ maps a created invoice to createPosuccess', () => {
    posService.createPos.mockReturnValue(cold('-a|', { a: invoice }));
    actions = hot('-a-|', { a: PosActions.createPos(request) });

    const expected = hot('--a|', { a: PosActions.createPosuccess(invoice) });

    expect(effects.createPos$).toBeObservable(expected);
    expect(posService.createPos).toHaveBeenCalledWith(request);
  });

  it('createPos$ maps an error to createPosFailure', () => {
    const error = new Error('boom');
    posService.createPos.mockReturnValue(cold('-#', {}, error));
    actions = hot('-a-|', { a: PosActions.createPos(request) });

    const expected = hot('--a|', {
      a: PosActions.createPosFailure({ error }),
    });

    expect(effects.createPos$).toBeObservable(expected);
  });

  it('onSuccess$ shows a success toast', () => {
    actions = hot('-a|', { a: PosActions.createPosuccess(invoice) });

    expect(effects.onSuccess$).toBeObservable(
      hot('-a|', { a: PosActions.createPosuccess(invoice) })
    );
    expect(toast.success).toHaveBeenCalled();
  });
});

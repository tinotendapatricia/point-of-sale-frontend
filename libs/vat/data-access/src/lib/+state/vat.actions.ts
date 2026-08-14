import { createAction, props } from '@ngrx/store';
import { VatEntity } from './vat.models';

export const getVatById = createAction('[Vats] Get Vat');

export const getVatByIdSuccess = createAction(
  '[Vats] Get Vat Success',
  props<{ vat: VatEntity }>()
);

export const getVatByIdFailure = createAction(
  '[Vats] Get Vat Failure',
  props<{ error: any }>()
);

export const updateVat = createAction(
  '[Vat] Update Vat',
  (vatDetails: VatEntity) => ({ vatDetails })
);

export const updateVatuccess = createAction(
  '[Vat] Update Vat Success',
  (vatDetails: VatEntity) => ({ vatDetails })
);

export const updateVatFailure = createAction(
  '[Vat] Update Vat Failure',
  props<{ error: Error }>()
);

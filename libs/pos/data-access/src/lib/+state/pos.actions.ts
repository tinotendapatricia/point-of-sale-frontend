import { createAction, props } from '@ngrx/store';
import { PosEntity } from './pos.models';

export const createPos = createAction(
  '[Pos] Create Pos',
  (posDetails: PosEntity) => ({ posDetails })
);

export const createPosuccess = createAction(
  '[Pos] Create Pos Success',
  (posDetails: PosEntity) => ({ posDetails })
);

export const createPosFailure = createAction(
  '[Pos] Create Pos Failure',
  props<{ error: Error }>()
);

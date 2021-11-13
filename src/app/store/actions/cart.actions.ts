import { createAction, props } from '@ngrx/store';
import { Unicorn } from '../../shared/models/unicorn.model';

export const toggleToCart = createAction('[Cart] TOGGLE_TO_CART', props<{ unicorn: Unicorn }>());
export const cleanCart = createAction('[Cart] CLEAN_CART');

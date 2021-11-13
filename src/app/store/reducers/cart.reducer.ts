import { createReducer, on } from '@ngrx/store';
import { cleanCart, toggleToCart } from '../actions/cart.actions';
import { deleteUnicorn } from '../actions/unicorns.actions';

const initialState: number[] = [];

export const cartReducer = createReducer(
  initialState,
  on(toggleToCart, (state, { unicorn }) => {
    const isInCart = state.some((unicornId) => unicornId === unicorn.id);
    let newCart;
    if (isInCart) {
      newCart = state.filter((unicornId) => unicornId !== unicorn.id);
    } else {
      newCart = state.concat(unicorn.id);
    }
    return newCart;
  }),
  on(cleanCart, () => initialState),
  on(deleteUnicorn, (state, { unicorn }) => state.filter((unicornId) => unicornId !== unicorn.id))
);

import { cleanCart } from '../actions/cart.actions';
import { cartReducer } from './cart.reducer';

describe('cartReducer', () => {
  let actualCart: number[];

  describe('cleanCart', () => {
    describe('when cart is not empty', () => {
      beforeEach(() => {
        actualCart = [1, 2, 3];
      });

      it('should clean cart', () => {
        const res = cartReducer(actualCart, cleanCart);

        expect(res).toEqual([]);
      });
    });
    describe('when cart is empty', () => {
      beforeEach(() => {
        actualCart = [];
      });

      it('should clean cart', () => {
        const res = cartReducer(actualCart, cleanCart);

        expect(res).toEqual([]);
      });
    });
  });

  describe('deleteUnicorn', () => {
    // TODO (easy ^^)
  });

  describe('toggleToCart', () => {
    // TODO (easy ^^)
  });
});

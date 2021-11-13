import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jest-marbles';
import { EntityState } from '../reducers';
import { CartSelectors } from './cart.selectors';

describe('CartSelectors', () => {
  let selectors: CartSelectors;
  let store: MockStore<EntityState>;
  const initialState = { unicorns: [], cart: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideMockStore({ initialState })],
    });

    store = TestBed.inject(MockStore);

    selectors = new CartSelectors(store);
  });

  it('should be created', () => {
    expect(selectors).toBeDefined();
  });

  describe('cart$', () => {
    it('should get cart', () => {
      store.setState({ cart: [1, 2, 3], unicorns: [] });

      const expected = hot('c', { c: [1, 2, 3] });
      expect(selectors.cart$).toBeObservable(expected);
    });
  });
});

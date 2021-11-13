import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Unicorn } from '../../shared/models/unicorn.model';
import { EntityState } from '../reducers';
import { getUnicorns } from './unicorns.selectors';

// selectors
const getCart = createFeatureSelector<number[]>('cart');
const isInCart = (unicorn: Unicorn) => createSelector(getCart, (state) => state.some((id) => id === unicorn.id));
const cartLength = createSelector(getCart, (state) => state.length);
const unicornsInCart = createSelector(getCart, getUnicorns, (cart, unicorns) => {
  return cart.map((unicornId) => unicorns.find((u) => u.id === unicornId) as Unicorn);
});

@Injectable({ providedIn: 'root' })
export class CartSelectors {
  constructor(private store: Store<EntityState>) {}

  public cart$ = this.store.select(getCart);
  public isInCart$ = (unicorn: Unicorn) => this.store.select(isInCart(unicorn));
  public cartLength$ = this.store.select(cartLength);
  public unicornsInCart$ = this.store.select(unicornsInCart);
}

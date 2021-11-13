import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Unicorn } from '../../shared/models/unicorn.model';
import { cleanCart, toggleToCart } from '../actions/cart.actions';
import { EntityState } from '../reducers';

@Injectable({ providedIn: 'root' })
export class CartDispatchers {
  constructor(private store: Store<EntityState>) {}

  public toggleToCart(unicorn: Unicorn): void {
    this.store.dispatch(toggleToCart({ unicorn }));
  }

  public clearCart(): void {
    this.store.dispatch(cleanCart());
  }
}

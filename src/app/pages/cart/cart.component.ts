import { Component } from '@angular/core';
import { Unicorn } from '../../shared/models/unicorn.model';
import { CartDispatchers } from '../../store/dispatchers/cart.dispatchers';
import { CartSelectors } from '../../store/selectors/cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  public cart$ = this._cartSelectors.unicornsInCart$;

  constructor(private readonly _cartSelectors: CartSelectors, private readonly _cartDispatchers: CartDispatchers) {}

  public removeFromCart(unicorn: Unicorn) {
    this._cartDispatchers.toggleToCart(unicorn);
  }
}

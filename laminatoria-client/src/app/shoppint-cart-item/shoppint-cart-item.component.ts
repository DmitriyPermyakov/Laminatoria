import { Component, Input } from '@angular/core'
import { ShoppingCartService } from '../services/shopping-cart.service'
import { OrderItem } from '../classes/orderItem'
import { FormGroup } from '@angular/forms'
import { AuthService } from '../services/auth.service'

@Component({
	selector: 'app-shoppint-cart-item',
	templateUrl: './shoppint-cart-item.component.html',
	styleUrls: ['./shoppint-cart-item.component.scss'],
})
export class ShoppintCartItemComponent {
	@Input() item: OrderItem
	@Input() disableCounter: boolean
	public area: number

	constructor(private shoppingCart: ShoppingCartService, public auth: AuthService) {}

	public changeAmount(value: number): void {
		this.item.amount = value
	}

	public removeItem(id): void {
		this.shoppingCart.removeFromCart(id)
	}
}

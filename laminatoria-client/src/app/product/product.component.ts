import { Component, Input } from '@angular/core'
import { Product } from '../classes/product'
import { ShoppingCartService } from '../services/shopping-cart.service'
import { AuthService } from '../services/auth.service'

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
	@Input() public product: Product

	constructor(public auth: AuthService, private shoppingCart: ShoppingCartService) {}

	public addToCart(): void {
		this.shoppingCart.addToCart(this.product)
	}
}

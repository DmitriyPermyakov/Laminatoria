import { Component, OnInit } from '@angular/core'
import { ShoppingCartService } from '../services/shopping-cart.service'
import { FormGroup } from '@angular/forms'

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
	public productItems: FormGroup[]
	public form: FormGroup

	constructor(private shoppingCart: ShoppingCartService) {}

	ngOnInit(): void {
		this.form = this.shoppingCart.form
		this.productItems = this.shoppingCart.orderItems
	}

	public removeItem(event: number): void {
		this.shoppingCart.removeFromCart(event)
	}
}

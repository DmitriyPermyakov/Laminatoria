import { Component, OnInit } from '@angular/core'
import { ShoppingCartService } from '../services/shopping-cart.service'
import { OrderItem } from '../classes/orderItem'

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
	public productItems: OrderItem[]

	constructor(private shoppingCart: ShoppingCartService) {}

	ngOnInit(): void {
		this.productItems = this.shoppingCart.orderItems
	}
}

import { Component, Input } from '@angular/core'
import { OrderItem } from '../classes/orderItem'

@Component({
	selector: 'app-shopping-cart-item-info',
	templateUrl: './shopping-cart-item-info.component.html',
	styleUrls: ['./shopping-cart-item-info.component.scss'],
})
export class ShoppingCartItemInfoComponent {
	@Input() item: OrderItem
}
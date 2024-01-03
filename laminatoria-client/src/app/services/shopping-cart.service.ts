import { Injectable } from '@angular/core'
import { Product } from '../classes/product'
import { OrderItem } from '../classes/orderItem'

@Injectable({
	providedIn: 'root',
})
export class ShoppingCartService {
	public orderItems: OrderItem[]

	constructor() {
		this.checkLocalStorage()
	}

	public addToCart(product: Product): void {
		if (this.orderItems.findIndex((p) => p.product.id == product.id) > -1) return

		this.orderItems.push(new OrderItem(product, 1))
		localStorage.setItem('shopping-cart', JSON.stringify(this.orderItems))
	}

	public removeFromCart(id: string): void {
		let index = this.orderItems.findIndex((p) => p.product.id == id)

		if (index < 0) return
		this.orderItems.splice(index, 1)

		if (this.orderItems.length == 0) {
			localStorage.removeItem('shopping-cart')
			return
		}

		localStorage.setItem('shopping-cart', JSON.stringify(this.orderItems))
	}

	private checkLocalStorage(): void {
		let item = localStorage.getItem('shopping-cart')

		if (item !== null) {
			this.orderItems = JSON.parse(item)
		} else {
			this.orderItems = []
		}
	}
}

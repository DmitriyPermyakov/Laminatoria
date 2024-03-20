import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ShoppingCartService } from '../services/shopping-cart.service'
import { OrderItem } from '../classes/orderItem'
import { Order } from '../classes/order'
import { Contacts } from '../classes/contacts'
import { OrdersService } from '../services/orders.service'
import { OrderRequest } from '../classes/orderRequest'
import { OrderItemRequest } from '../classes/orderItemRequest'
import { Router } from '@angular/router'

@Component({
	selector: 'app-accept-order',
	templateUrl: './accept-order.component.html',
	styleUrls: ['./accept-order.component.scss'],
})
export class AcceptOrderComponent implements OnInit {
	public form: FormGroup
	public isLoading: boolean = false

	constructor(
		private shoppingCart: ShoppingCartService,
		private orderService: OrdersService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.form = this.shoppingCart.form
	}

	public onSubmit(): void {
		this.isLoading = true
		let contacts = new Contacts(0, this.form.value.name, this.form.value.email, this.form.value.phone.toString(), 0)
		let orderItems: OrderItem[] = this.form.value.items

		let summary: number = orderItems.reduce((sum, curr) => {
			return sum + curr.amount * curr.product.price
		}, 0)

		// let order = new Order(
		// 	0,
		// 	contacts,
		// 	0,
		// 	this.form.value.address,
		// 	this.form.value.comment,
		// 	new Date(Date.now()),
		// 	orderItems,
		// 	this.form.value.delivery,
		// 	summary
		// )

		let items: OrderItemRequest[] = []
		orderItems.forEach((i) => {
			items.push(new OrderItemRequest(0, i.amount, i.additionalPropValue, i.orderId, i.product.id))
		})

		let orderRequest: OrderRequest = new OrderRequest(
			0,
			contacts,
			0,
			this.form.value.address,
			this.form.value.comment,
			new Date(Date.now()),
			items,
			this.form.value.delivery,
			summary
		)

		console.log(orderRequest)
		// localStorage.setItem('order', JSON.stringify(order))
		this.orderService.createOrder(orderRequest).subscribe(() => {
			this.isLoading = false
			this.router.navigate(['/orders'])
		})
	}
}

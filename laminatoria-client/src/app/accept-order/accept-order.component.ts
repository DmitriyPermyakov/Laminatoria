import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ShoppingCartService } from '../services/shopping-cart.service'
import { OrderItem } from '../classes/orderItem'
import { Order } from '../classes/order'
import { Contacts } from '../classes/contacts'

@Component({
	selector: 'app-accept-order',
	templateUrl: './accept-order.component.html',
	styleUrls: ['./accept-order.component.scss'],
})
export class AcceptOrderComponent implements OnInit {
	public form: FormGroup

	constructor(private shoppingCart: ShoppingCartService) {}

	ngOnInit(): void {
		this.form = this.shoppingCart.form
	}

	public onSubmit(): void {
		let contacts = new Contacts('0', this.form.value.name, this.form.value.email, this.form.value.phone)
		let orderItems: OrderItem[] = this.form.value.items
		console.log(orderItems)
		let order = new Order(
			'aaaa',
			contacts,
			this.form.value.address,
			this.form.value.comment,
			new Date(Date.now()),
			orderItems,
			this.form.value.delivery
		)
		console.log(order)
		localStorage.setItem('order', JSON.stringify(order))
	}
}

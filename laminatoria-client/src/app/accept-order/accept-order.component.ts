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
	private orderItems: OrderItem[]

	constructor(private fb: FormBuilder, private shoppingCart: ShoppingCartService) {}

	ngOnInit(): void {
		this.form = this.fb.group({
			name: [{ value: '', disabled: false }, Validators.required],
			phone: [{ value: '', disabled: false }],
			email: [{ value: '', disabled: false }, Validators.email],
			address: [{ value: '', disabled: false }, Validators.required],
			comment: [{ value: '', disabled: false }],
			online: [{ value: false, disabled: false }, Validators.required],
		})

		this.orderItems = this.shoppingCart.orderItems
	}

	public onSubmit(): void {
		let contacts = new Contacts('0', this.form.value.name, this.form.value.email, this.form.value.phone)

		let order = new Order(
			'aaaa',
			contacts,
			this.form.value.address,
			this.form.value.comment,
			new Date(Date.now()),
			this.orderItems,
			'asdf'
		)
		console.log(order)
		localStorage.setItem('order', JSON.stringify(order))
	}
}

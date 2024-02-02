import { Component, ElementRef, ViewChild } from '@angular/core'
import { FormArray, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'

import { Order } from '../classes/order'
import { Product } from '../classes/product'
import { ProductsService } from '../services/products.service'
import { Contacts } from '../classes/contacts'
import { OrderItemRequest } from '../classes/orderItemRequest'
import { OrderRequest } from '../classes/orderRequest'
import { OrdersService } from '../services/orders.service'
import { Router } from '@angular/router'

@Component({
	selector: 'app-create-order',
	templateUrl: './create-order.component.html',
	styleUrls: ['../order-position-edit/order-position-edit.component.scss'],
})
export class CreateOrderComponent {
	public order: OrderRequest
	public form: FormGroup
	public products: Product[] = []

	@ViewChild('productContainer') productContainer: ElementRef

	public get items(): FormGroup[] {
		return (this.form.controls['items'] as FormArray).controls as FormGroup[]
	}

	public get summary(): number {
		return this.items.reduce((sum, curr) => {
			return sum + curr.value.product.price * curr.value.amount
		}, 0)
	}

	constructor(
		private fb: NonNullableFormBuilder,
		private productService: ProductsService,
		private orderService: OrdersService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.initForm()
		this.productService.getAll(' ').subscribe((p) => (this.products = p))
	}

	public addItem(product: Product): void {
		;(this.productContainer.nativeElement as HTMLElement).classList.remove('visible')
		let item = this.fb.group({
			id: [{ value: 0, disabled: false }],
			product: [{ value: product, disabled: false }],
			amount: [{ value: 1, disabled: false }],
			additionalPropValue: [{ value: product.additionalProperty.values.trim().split(' ')[0], disabled: false }],
			orderId: [{ value: 0, disabled: false }],
		})
		this.items.push(item)
	}

	public removeItem(event: number): void {
		;(this.form.controls['items'] as FormArray).removeAt(event)
	}

	public showMenu(): void {
		;(this.productContainer.nativeElement as HTMLElement).classList.add('visible')
	}

	public closeMenu(): void {
		;(this.productContainer.nativeElement as HTMLElement).classList.remove('visible')
	}

	public createOrder(): void {
		let contacts: Contacts = new Contacts(
			0,
			this.form.controls['name'].value,
			this.form.controls['email'].value,
			this.form.controls['phone'].value,
			0
		)

		let orderItems: OrderItemRequest[] = []
		this.items.forEach((fg: FormGroup) => {
			let item = new OrderItemRequest(
				0,
				fg.controls['amount'].value,
				fg.controls['additionalPropValue'].value,
				0,
				fg.controls['product'].value.id
			)
			orderItems.push(item)
		})

		let order: OrderRequest = new OrderRequest(
			0,
			contacts,
			+this.form.controls['status'].value,

			this.form.controls['address'].value,
			this.form.controls['comment'].value,
			new Date(Date.now()),
			orderItems,
			this.form.controls['delivery'].value,
			this.summary
		)

		console.log(order)

		this.orderService.createOrder(order).subscribe((id: number) => {
			if (id > 0) this.router.navigate(['orders', id])
		})
	}

	private initForm(): void {
		this.form = this.fb.group({
			id: [{ value: 0, disabled: false }],
			name: [{ value: '', disabled: false }, Validators.required],
			phone: [{ value: '', disabled: false }, Validators.required],
			email: [{ value: '', disabled: false }, Validators.email],
			address: [{ value: '', disabled: false }, Validators.required],
			status: [{ value: '', disabled: false }],
			comment: [{ value: '', disabled: false }],
			delivery: [{ value: '', disabled: false }],
			items: this.fb.array([]),
		})
	}
}

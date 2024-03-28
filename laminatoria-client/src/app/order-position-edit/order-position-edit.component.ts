import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { CacheService } from '../services/cache.service'
import { OrdersService } from '../services/orders.service'
import { Order } from '../classes/order'
import { ActivatedRoute, Router } from '@angular/router'
import { FormArray, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { Product, typeOfProduct } from '../classes/product'
import { ProductsService } from '../services/products.service'
import { Contacts } from '../classes/contacts'
import { OrderRequest } from '../classes/orderRequest'
import { OrderItemRequest } from '../classes/orderItemRequest'

@Component({
	selector: 'app-order-position-edit',
	templateUrl: './order-position-edit.component.html',
	styleUrls: ['./order-position-edit.component.scss'],
})
export class OrderPositionEditComponent implements OnInit {
	public order: Order
	public form: FormGroup
	public products: Product[] = []
	public id: string

	@ViewChild('productContainer') productContainer: ElementRef

	public get items(): FormGroup[] {
		return (this.form.controls['items'] as FormArray).controls as FormGroup[]
	}

	public get summary(): number {
		return this.items.reduce((sum, curr) => {
			return sum + parseFloat(curr?.value.sumPrice)
		}, 0)
	}
	constructor(
		private cacheService: CacheService,
		private ordersService: OrdersService,
		private activatedRoute: ActivatedRoute,
		private fb: NonNullableFormBuilder,
		private productService: ProductsService,
		private orderService: OrdersService,
		private router: Router
	) {
		this.id = this.activatedRoute.snapshot.params['id']
	}

	ngOnInit(): void {
		this.loadProduct()
		this.productService.getAll(' ').subscribe((p) => (this.products = p))
	}

	public addItem(product: Product): void {
		;(this.productContainer.nativeElement as HTMLElement).classList.remove('visible')

		let addPropValue = ''
		if (product.additionalProperty) {
			addPropValue = product.additionalProperty.values.trim().split(' ')[0]
		}

		let price: number

		if (product.typeOfProduct == typeOfProduct.cutting) {
			price = (parseFloat(addPropValue) || 1) * product.price
		} else {
			price = product.price
		}

		let item = this.fb.group({
			id: [{ value: 0, disabled: false }],
			product: [{ value: product, disabled: false }],
			amount: [{ value: 1, disabled: false }],
			additionalPropValue: [{ value: product.additionalProperty.values.trim().split(' ')[0], disabled: false }],
			orderId: [{ value: this.order.id, disabled: false }],
			sumPrice: [{ value: price, disabled: false }],
		})

		;(this.form.controls['items'] as FormArray).push(item)
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

	private loadProduct(): void {
		let orders: Order[] = this.cacheService.get('orders' + this.cacheService.orderPageNumber)
		if (orders == undefined) this.loadFromServer()
		else {
			this.order = orders.filter((o) => o.id == +this.id)[0]
			if (!this.order) {
				this.loadFromServer
				return
			}
			this.initForm()
		}
	}

	private loadFromServer(): void {
		this.ordersService.getById(this.id).subscribe((o) => {
			this.order = o
			this.initForm()
		})
	}

	private initForm(): void {
		this.form = this.fb.group({
			id: [{ value: this.order.id, disabled: false }],
			name: [{ value: this.order.contacts.name, disabled: false }, Validators.required],
			status: [{ value: this.order.status, disabled: false }, Validators.required],
			phone: [{ value: this.order.contacts.phone, disabled: false }, Validators.required],
			email: [{ value: this.order.contacts.email, disabled: false }, Validators.email],
			address: [{ value: this.order.address, disabled: false }, Validators.required],
			comment: [{ value: this.order.comments, disabled: false }],
			delivery: [{ value: this.order.delivery, disabled: false }, Validators.required],
			items: this.fb.array([]),
		})

		this.order.orderItems.forEach((o) => {
			let item = this.fb.group({
				id: [{ value: o.id, disabled: false }],
				product: [{ value: o.product, disabled: false }],
				amount: [{ value: o.amount, disabled: false }],
				additionalPropValue: [{ value: o.additionalPropValue, disabled: false }],
				orderId: [{ value: this.order.id, disabled: false }],
				sumPrice: [{ value: o.sumPrice, disabled: false }],
			})

			this.items.push(item)
		})
	}

	public updateOrder(): void {
		let contacts: Contacts = new Contacts(
			this.order.contacts.id,
			this.form.controls['name'].value,
			this.form.controls['email'].value,
			this.form.controls['phone'].value,
			this.order.id
		)

		let orderItems: OrderItemRequest[] = []
		this.items.forEach((fg: FormGroup) => {
			let item = new OrderItemRequest(
				fg.controls['id'].value,
				fg.controls['amount'].value,
				fg.controls['additionalPropValue'].value,
				fg.controls['orderId'].value,
				fg.controls['product'].value.id,
				this.orderItemPrice(fg)
			)
			orderItems.push(item)
		})

		let order: OrderRequest = new OrderRequest(
			this.order.id,
			contacts,
			+this.form.controls['status'].value,

			this.form.controls['address'].value,
			this.form.controls['comment'].value,
			this.order.date,
			orderItems,
			this.form.controls['delivery'].value,
			this.summary
		)

		this.orderService.updateOrder(order).subscribe(() => {
			this.cacheService.shouldUpdateOrders = true
			this.router.navigate(['orders', +this.id])
		})
	}

	private orderItemPrice(fg: FormGroup): number {
		if (fg.controls['product'].value.typeOfProduct == typeOfProduct.cutting) {
			let price =
				fg.controls['amount'].value *
				parseFloat(fg.controls['additionalPropValue'].value) *
				fg.controls['product'].value.price
			return price
		} else {
			return fg.controls['amount'].value * fg.controls['product'].value.price
		}
	}
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { CacheService } from '../services/cache.service'
import { OrdersService } from '../services/orders.service'
import { Order } from '../classes/order'
import { ActivatedRoute } from '@angular/router'
import { FormArray, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { Product } from '../classes/product'
import { ProductsService } from '../services/products.service'

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
	constructor(
		private cacheService: CacheService,
		private ordersService: OrdersService,
		private activatedRoute: ActivatedRoute,
		private fb: NonNullableFormBuilder,
		private productService: ProductsService
	) {
		this.id = this.activatedRoute.snapshot.params['id']
	}

	ngOnInit(): void {
		let orders: Order[] = this.cacheService.get('orders' + this.cacheService.orderPageNumber)
		if (!orders)
			this.ordersService.getById(this.id).subscribe((o) => {
				this.order = o
				this.initForm()
			})
		else {
			this.order = orders.filter((o) => o.id == this.id)[0]
			this.initForm()
		}

		this.productService.getAll().subscribe((p) => (this.products = p))
	}

	public addItem(product: Product): void {
		;(this.productContainer.nativeElement as HTMLElement).classList.remove('visible')
		let item = this.fb.group({
			product: [{ value: product, disabled: false }],
			amount: [{ value: 1, disabled: false }],
			additionalPropValue: [{ value: product.additionalProperty.values[0], disabled: false }],
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

	private initForm(): void {
		// добавить статус
		this.form = this.fb.group({
			name: [{ value: this.order.contacts.name, disabled: false }, Validators.required],
			phone: [{ value: this.order.contacts.phone, disabled: false }, Validators.required],
			email: [{ value: this.order.contacts.email, disabled: false }, Validators.email],
			address: [{ value: this.order.address, disabled: false }, Validators.required],
			comment: [{ value: this.order.comment, disabled: false }],
			delivery: [{ value: this.order.delivery, disabled: false }],
			items: this.fb.array([]),
		})

		this.order.orderItems.forEach((o) => {
			let item = this.fb.group({
				product: [{ value: o.product, disabled: false }],
				amount: [{ value: o.amount, disabled: false }],
				additionalPropValue: [{ value: o.additionalPropValue, disabled: false }],
			})

			this.items.push(item)
		})
	}
}

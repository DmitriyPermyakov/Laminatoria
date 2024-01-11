import { Component, OnInit } from '@angular/core'
import { CacheService } from '../services/cache.service'
import { OrdersService } from '../services/orders.service'
import { Order } from '../classes/order'
import { ActivatedRoute } from '@angular/router'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
	selector: 'app-order-position-edit',
	templateUrl: './order-position-edit.component.html',
	styleUrls: ['./order-position-edit.component.scss'],
})
export class OrderPositionEditComponent implements OnInit {
	public order: Order
	public form: FormGroup

	public get items(): FormGroup[] {
		return (this.form.controls['items'] as FormArray).controls as FormGroup[]
	}
	private id: string
	constructor(
		private cacheService: CacheService,
		private ordersService: OrdersService,
		private activatedRoute: ActivatedRoute,
		private fb: FormBuilder
	) {
		this.id = this.activatedRoute.snapshot.params['id']
	}

	ngOnInit(): void {
		let orders: Order[] = this.cacheService.get('orders' + this.cacheService.pageNumber)
		if (!orders)
			this.ordersService.getById(this.id).subscribe((o) => {
				this.order = o
				this.initForm()
			})
		else {
			this.order = orders.filter((o) => o.id == this.id)[0]
			this.initForm()
		}
	}

	public removeItem(event: number): void {
		;(this.form.controls['items'] as FormArray).removeAt(event)
	}

	private initForm(): void {
		// добавить статус
		this.form = this.fb.group({
			name: [{ value: this.order.contacts.name, disabled: false }, Validators.required],
			phone: [{ value: this.order.contacts.phone, disabled: false }, Validators.required],
			email: [{ value: this.order.contacts.email, disabled: false }, Validators.email],
			address: [{ value: this.order.address, disabled: false }, Validators.required],
			comment: [{ value: this.order.comment, disabled: false }],
			items: new FormArray([]),
		})

		this.order.orderItems.forEach((o) => {
			let item = new FormGroup({
				product: new FormControl(o.product),
				amount: new FormControl(o.amount),
			})
			this.items.push(item)
		})
	}
}

import { Injectable, OnDestroy } from '@angular/core'
import { Product, typeOfProduct } from '../classes/product'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { Subscription } from 'rxjs'
import { OrderItem } from '../classes/orderItem'

@Injectable({
	providedIn: 'root',
})
export class ShoppingCartService implements OnDestroy {
	public get orderItems(): FormGroup[] {
		return this.items.controls as FormGroup[]
	}

	public form: FormGroup

	private get items(): FormArray {
		return this.form.controls['items'] as FormArray
	}

	private valueChangeSub: Subscription

	constructor(private fb: FormBuilder) {
		this.initForm()
		this.checkLocalStorage()
		this.valueChangeSub = this.form.valueChanges.subscribe(() => {
			localStorage.setItem('shopping-cart', JSON.stringify(this.form.value))
		})
	}

	ngOnDestroy(): void {
		if (this.valueChangeSub) this.valueChangeSub.unsubscribe()
	}

	public addToCart(product: Product, propValue): void {
		if (!propValue && product.additionalProperty) {
			propValue = product.additionalProperty.values.trim().split(' ')[0]
		}

		let price: number
		if (product.typeOfProduct == typeOfProduct.cutting) {
			price = (parseFloat(propValue) || 1) * product.price
		} else {
			price = product.price
		}

		let item = this.fb.group({
			id: [{ value: 0, disabled: false }],
			product: [{ value: product, disabled: false }],
			amount: [{ value: 1, disabled: false }],
			additionalPropValue: [{ value: propValue, disabled: false }],
			orderId: [{ value: 0, disabled: false }],
			sumPrice: [{ value: price, disabled: false }],
		})

		this.items.push(item)
		localStorage.setItem('shopping-cart', JSON.stringify(this.form.value))
	}

	public removeFromCart(id: number): void {
		this.items.removeAt(id)

		localStorage.setItem('shopping-cart', JSON.stringify(this.form.value))
	}

	private checkLocalStorage(): void {
		let itemString = localStorage.getItem('shopping-cart')

		if (itemString !== null) {
			let item = JSON.parse(itemString)
			this.form.patchValue(item)
			item.items.forEach((i: OrderItem) => {
				let item = this.fb.group({
					id: [{ value: i.id, disabled: false }],
					product: [{ value: i.product, disabled: false }],
					amount: [{ value: i.amount, disabled: false }],
					additionalPropValue: [{ value: i.additionalPropValue, disabled: false }],
					orderId: [{ value: i.orderId, disabled: false }],
					sumPrice: [{ value: i.sumPrice, disabled: false }],
				})
				;(<FormArray>this.form.controls['items']).push(item)
			})
		}
	}

	private initForm(): void {
		this.form = this.fb.group({
			name: [{ value: '', disabled: false }],
			email: [{ value: '', disabled: false }],
			phone: [{ value: '', disabled: false }],
			address: [{ value: '', disabled: false }],
			delivery: [{ value: 'delivery', disabled: false }],
			comment: [{ value: '', disabled: false }],
			items: this.fb.array([]),
			summary: [{ value: '', disabled: false }],
		})
	}
}

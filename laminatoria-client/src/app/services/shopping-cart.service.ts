import { Injectable, OnDestroy } from '@angular/core'
import { Product } from '../classes/product'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { Subscription } from 'rxjs'

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

	public addToCart(product: Product, additionalPropValue?: string): void {
		if (this.items.value.findIndex((p) => p.additionalPropValue == additionalPropValue) > -1) return

		if (!additionalPropValue && product.additionalProperty !== null) {
			additionalPropValue = product.additionalProperty.values[0]
		}
		let item = this.fb.group({
			product: [{ value: product, disabled: false }],
			amount: [{ value: 1, disabled: false }],
			additionalPropValue: [{ value: additionalPropValue, disabled: false }],
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
			item.items.forEach((i) => {
				let item = this.fb.group({
					product: [{ value: i.product, disabled: false }],
					amount: [{ value: i.amount, disabled: false }],
					additionalPropValue: [{ value: i.additionalPropValue, disabled: false }],
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

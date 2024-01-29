import { Component, ElementRef, ViewChild } from '@angular/core'
import { FormArray, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'

import { Order } from '../classes/order'
import { Product } from '../classes/product'
import { ProductsService } from '../services/products.service'

@Component({
	selector: 'app-create-order',
	templateUrl: './create-order.component.html',
	styleUrls: ['../order-position-edit/order-position-edit.component.scss'],
})
export class CreateOrderComponent {
	public order: Order
	public form: FormGroup
	public summary: number = 0
	public products: Product[] = []

	@ViewChild('productContainer') productContainer: ElementRef

	public get items(): FormGroup[] {
		return (this.form.controls['items'] as FormArray).controls as FormGroup[]
	}

	constructor(private fb: NonNullableFormBuilder, private productService: ProductsService) {}

	ngOnInit(): void {
		this.initForm()
		// this.productService.getAll().subscribe((p) => (this.products = p))
	}

	public addItem(product: Product): void {
		;(this.productContainer.nativeElement as HTMLElement).classList.remove('visible')
		let item = this.fb.group({
			product: [{ value: product, disabled: false }],
			amount: [{ value: 1, disabled: false }],
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
			name: [{ value: '', disabled: false }, Validators.required],
			phone: [{ value: '', disabled: false }, Validators.required],
			email: [{ value: '', disabled: false }, Validators.email],
			address: [{ value: '', disabled: false }, Validators.required],
			comment: [{ value: '', disabled: false }],
			delivery: [{ value: '', disabled: false }],
			items: this.fb.array([]),
		})
	}
}

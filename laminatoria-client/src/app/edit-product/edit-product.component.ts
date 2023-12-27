import { Component, OnInit } from '@angular/core'
import { CacheService } from '../services/cache.service'
import { Product, typeOfMeasurement, typeOfProduct } from '../classes/product'
import { ActivatedRoute } from '@angular/router'
import { switchMap } from 'rxjs'
import { ProductsService } from '../services/products.service'
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'

@Component({
	selector: 'app-edit-product',
	templateUrl: './edit-product.component.html',
	styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
	public product: Product
	public form: FormGroup

	public typeOfProduct: typeOfProduct
	public typeOfMeasurement: typeOfMeasurement

	public get propertiesControl(): FormControl {
		return this.form.controls['properties'] as FormControl
	}

	public get additionalProps(): FormControl {
		return this.form.controls['additional'] as FormControl
	}

	public key: string = ''
	private resetValue: string[]
	constructor(
		private cacheService: CacheService,
		private activatedRoute: ActivatedRoute,
		private productService: ProductsService,
		private fb: NonNullableFormBuilder
	) {}

	ngOnInit(): void {
		let id = this.activatedRoute.snapshot.paramMap.get('id')
		const data = this.cacheService.get('products')

		if (!data) {
			this.productService
				.getAll()
				.pipe(switchMap((prod) => prod.filter((p) => p.id == id)))
				.subscribe((product) => {
					this.product = product
					this.initForm()
				})
		} else {
			this.product = data.filter((p) => p.id == id)[0]
			this.initForm()
		}

		this.checkAdditionalProperties()

		this.resetValue = Array.from(this.additionalProps.value.value.get(this.key))
		console.log(this.resetValue)

		//#TODO: обработка ошибок
		//#TODO: запомнить обратную навигацию
	}

	public resetForm(): void {
		this.form.controls['additional'].value.value.delete(this.key)
		this.form.controls['additional'].value.value.set(this.key, this.resetValue)
		console.log(this.resetValue)

		this.form.reset()
		console.log(this.resetValue)
	}

	private initForm(): void {
		this.form = this.fb.group({
			id: [{ value: this.product.id }],
			name: [{ value: this.product.name, disabled: false }, Validators.required],
			vendor: [{ value: this.product.vendor, disabled: false }, Validators.required],
			categorid: [{ value: this.product.category, disabled: false }, Validators.required],
			properties: [{ value: this.product.properties, disabled: false }, Validators.required],
			additional: [{ value: this.product.additionalProperty, disables: false }],
			type: [{ value: this.product.type, disabled: false }, Validators.required],
			typeOfMeasurement: [{ value: this.product.typeOfMeasurement, disabled: false }, Validators.required],
			price: [{ value: this.product.price, disabled: false }, Validators.required],
			relatedProducts: [{ value: '' }],
		})
	}

	public addAdditionalProp(event): void {
		if (event.value !== '') {
			this.additionalProps.value.value.get(this.key).push(event.value)
			event.value = ''
		}
		console.log(this.resetValue)
	}

	private checkAdditionalProperties(): void {
		if (this.additionalProps.value.value !== '') {
			this.key = this.additionalProps.value.value.keys().next().value
		}
	}
}

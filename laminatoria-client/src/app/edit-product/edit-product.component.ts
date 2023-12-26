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

		console.log(this.product)
	}

	public resetForm(): void {
		this.form.reset()
	}

	private initForm(): void {
		this.form = this.fb.group({
			id: [{ value: this.product.id }],
			name: [{ value: this.product.name, disabled: false }, Validators.required],
			vendor: [{ value: this.product.vendor, disabled: false }, Validators.required],
			categorid: [{ value: this.product.category, disabled: false }, Validators.required],
			properties: [{ value: this.product.properties, disabled: false }, Validators.required],
			type: [{ value: this.product.type, disabled: false }, Validators.required],
			typeOfMeasurement: [{ value: this.product.typeOfMeasurement, disabled: false }, Validators.required],
			price: [{ value: this.product.price, disabled: false }, Validators.required],
			relatedProducts: [{ value: '' }],
		})
	}
}

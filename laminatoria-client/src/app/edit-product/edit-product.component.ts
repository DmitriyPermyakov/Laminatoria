import { Component, OnInit, ViewChild } from '@angular/core'
import { CacheService } from '../services/cache.service'
import { Product, typeOfMeasurement, typeOfProduct } from '../classes/product'
import { ActivatedRoute } from '@angular/router'
import { switchMap } from 'rxjs'
import { ProductsService } from '../services/products.service'
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'

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

	public get propertiesFormArray(): FormArray {
		return this.form.controls['properties'] as FormArray
	}

	public get additionalProps(): FormControl {
		return this.form.controls['additional'] as FormControl
	}

	@ViewChild('adProps') private additionalPropComp
	@ViewChild('props') private props
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

		//#TODO: обработка ошибок
		//#TODO: запомнить обратную навигацию
	}

	public onSubmit(): void {
		console.log(JSON.stringify(this.form.value))
	}

	public resetForm(): void {
		this.form.reset()
		this.additionalPropComp.resetControls()
	}

	private initForm(): void {
		this.form = this.fb.group({
			id: this.product.id,
			name: [{ value: this.product.name, disabled: false }, Validators.required],
			vendor: [{ value: this.product.vendor, disabled: false }, Validators.required],
			categorid: [{ value: this.product.category, disabled: false }, Validators.required],
			properties: this.fb.array([]),
			additional: [{ value: this.product.additionalProperty, disabled: false }],
			type: [{ value: this.product.type, disabled: false }, Validators.required],
			typeOfMeasurement: [{ value: this.product.typeOfMeasurement, disabled: false }, Validators.required],
			price: [{ value: this.product.price, disabled: false }, Validators.required],
			relatedProducts: [{ value: '' }],
		})

		this.product.properties.forEach((p) => {
			this.propertiesFormArray.push(
				this.fb.group({
					property: [{ value: p.property, disabled: false }, Validators.required],
					value: [{ value: p.value, disabled: false }, Validators.required],
				})
			)
		})
	}

	private checkAdditionalProperties(): void {
		//#TODO: проверить наличие дополнительных свойств
	}
}

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
	public id: string

	// public typeOfProduct: typeOfProduct
	// public typeOfMeasurement: typeOfMeasurement

	public get propertiesFormArray(): FormArray {
		return this.form.controls['properties'] as FormArray
	}

	public get additionalProps(): FormGroup {
		return this.form.controls['additional'] as FormGroup
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
		this.id = this.activatedRoute.snapshot.paramMap.get('id')

		this.loadProduct()

		this.checkAdditionalProperties()

		//#TODO: обработка ошибок
		//#TODO: запомнить обратную навигацию
	}

	public onSubmit(): void {
		console.log(JSON.stringify(this.form.value))
	}

	private initForm(): void {
		this.form = this.fb.group({
			id: this.product.id,
			name: [{ value: this.product.name, disabled: false }, Validators.required],
			vendor: [{ value: this.product.vendor, disabled: false }, Validators.required],
			categorid: [{ value: this.product.category, disabled: false }, Validators.required],
			properties: this.fb.array([]),
			additional: this.fb.group({
				id: [{ value: this.product.additionalProperty?.id ?? 0, disabled: false }],
				name: [{ value: this.product.additionalProperty?.name ?? '', disabled: false }],
				values: [{ value: this.product.additionalProperty?.values ?? '', disabled: false }],
			}),
			typeOfProduct: [{ value: this.product.typeOfProduct, disabled: false }, Validators.required],
			typeOfMeasurement: [{ value: this.product.typeOfMeasurement, disabled: false }, Validators.required],
			price: [{ value: this.product.price, disabled: false }, Validators.required],
			relatedProducts: [{ value: '' }],
		})

		this.product.properties.forEach((p) => {
			this.propertiesFormArray.push(
				this.fb.group({
					id: [{ value: p.id, disabled: false }],
					property: [{ value: p.property, disabled: false }, Validators.required],
					value: [{ value: p.value, disabled: false }, Validators.required],
				})
			)
		})
	}

	private loadProduct(): void {
		if (this.id != '') {
			const data = this.cacheService.get('products' + this.cacheService.productPageNumber)

			if (data != undefined) {
				this.product = data.find((p) => p.id == this.id)
				if (!this.product) this.loadProductFromServer(+this.id)
				else this.initForm()
			} else {
				this.loadProductFromServer(+this.id)
			}
		}
	}

	private loadProductFromServer(id: number): void {
		this.productService.getById(+this.id).subscribe((product) => {
			this.product = product
			this.initForm()
		})
	}
	private checkAdditionalProperties(): void {
		//#TODO: проверить наличие дополнительных свойств
	}
}

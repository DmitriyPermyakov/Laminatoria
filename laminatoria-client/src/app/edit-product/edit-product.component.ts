import { AfterViewInit, Component, OnInit } from '@angular/core'
import { CacheService } from '../services/cache.service'
import { Product } from '../classes/product'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductsService } from '../services/products.service'
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { CategoriesService } from '../services/categories.service'
import { Category } from '../classes/category'

@Component({
	selector: 'app-edit-product',
	templateUrl: './edit-product.component.html',
	styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit, AfterViewInit {
	public product: Product
	public form: FormGroup
	public id: string
	public categories: Category[]

	public get propertiesFormArray(): FormArray {
		return this.form.controls['properties'] as FormArray
	}

	public get additionalProps(): FormGroup {
		return this.form.controls['additionalProperty'] as FormGroup
	}

	public get category(): FormControl {
		return this.form.controls['category'] as FormControl
	}

	constructor(
		private categorisService: CategoriesService,
		private cacheService: CacheService,
		private activatedRoute: ActivatedRoute,
		private productService: ProductsService,
		private fb: NonNullableFormBuilder,
		private router: Router
	) {}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.paramMap.get('id')

		this.categorisService.getCategories().subscribe((c) => {
			this.categories = c
		})

		this.loadProduct()

		//#TODO: обработка ошибок
		//#TODO: запомнить обратную навигацию
	}

	ngAfterViewInit(): void {}

	public onSubmit(): void {
		console.log(this.form.value)
		this.productService.updateProduct(this.form.value).subscribe((id) => {
			if (id > 0) {
				this.router.navigate(['/products', id])
			}
		})
	}

	public changeCategory(event: any): void {
		let category = this.categories.find((c) => c.value == event.target.value)
		console.log(category)
		this.category.setValue(category)
	}

	private initForm(): void {
		this.form = this.fb.group({
			id: this.product.id,
			name: [{ value: this.product.name, disabled: false }, Validators.required],
			vendor: [{ value: this.product.vendor, disabled: false }, Validators.required],
			category: [{ value: this.product.category, disabled: false }, Validators.required],
			properties: this.fb.array([]),
			additionalProperty: this.fb.group({
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
}

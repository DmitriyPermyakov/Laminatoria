import { Component, OnInit, ViewChild } from '@angular/core'
import { ProductsService } from '../services/products.service'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { CategoriesService } from '../services/categories.service'
import { Category } from '../classes/category'
import { Router } from '@angular/router'
import { CacheService } from '../services/cache.service'
import { ImagesComponent } from '../images/images.component'
import { AdditionalPropsComponent } from '../additional-props/additional-props.component'

@Component({
	selector: 'app-create-product',
	templateUrl: './create-product.component.html',
	styleUrls: ['../edit-product/edit-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
	@ViewChild(ImagesComponent) imageComp: ImagesComponent
	@ViewChild(AdditionalPropsComponent) addPropComp: AdditionalPropsComponent

	public form: FormGroup
	public categories: Category[]

	public get propertiesFormArray(): FormArray {
		return this.form.controls['properties'] as FormArray
	}

	public get additionalProps(): FormGroup {
		return this.form.controls['additionalProperty'] as FormGroup
	}

	public get imagesControl(): FormControl {
		return this.form.controls['images'] as FormControl
	}

	public isSavingProduct: boolean = false

	constructor(
		private productService: ProductsService,
		private fb: FormBuilder,
		private categoriesService: CategoriesService,
		private router: Router,
		private cache: CacheService
	) {}

	ngOnInit(): void {
		this.categoriesService.getCategories().subscribe((c) => {
			this.categories = c
		})
		this.initForm()
	}

	public onSubmit(): void {
		this.productService.createProduct(this.form.value).subscribe((id) => {
			if (id > 0) {
				this.router.navigate(['/products', id])
				this.cache.shouldUpdateProducts = true
			}
		})
	}

	public resetForm(): void {
		this.form.reset()
		this.addPropComp.resetArray()
	}

	private initForm(): void {
		this.form = this.fb.group({
			id: '0',
			name: [{ value: '', disabled: false }, Validators.required],
			vendor: [{ value: '', disabled: false }, Validators.required],
			category: [{ value: '', disabled: false }, Validators.required],
			properties: this.fb.array([]),
			additionalProperty: this.fb.group({
				id: [{ value: 0, disabled: false }],
				name: [{ value: '', disabled: false }],
				values: [{ value: '', disabled: false }],
			}),
			typeOfProduct: [{ value: '', disabled: false }, Validators.required],
			typeOfMeasurement: [{ value: '', disabled: false }, Validators.required],
			price: [{ value: '', disabled: false }, Validators.required],
			images: [{ value: '', disabled: false }],
		})
	}
}

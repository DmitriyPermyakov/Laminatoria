import { Component, OnInit, ViewChild } from '@angular/core'
import { ProductsService } from '../services/products.service'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { CategoriesService } from '../services/categories.service'
import { Category } from '../classes/category'

@Component({
	selector: 'app-create-product',
	templateUrl: './create-product.component.html',
	styleUrls: ['../edit-product/edit-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
	public form: FormGroup
	public categories: Category[]

	@ViewChild('adProps') private additionalPropComp
	@ViewChild('props') private props

	public get propertiesFormArray(): FormArray {
		return this.form.controls['properties'] as FormArray
	}

	public get additionalProps(): FormGroup {
		return this.form.controls['additionalProperty'] as FormGroup
	}

	constructor(
		private productService: ProductsService,
		private fb: FormBuilder,
		private categoriesService: CategoriesService
	) {}

	ngOnInit(): void {
		this.categoriesService.getCategories().subscribe((c) => (this.categories = c))
		this.initForm()
	}

	public onSubmit(): void {
		console.log(JSON.stringify(this.form.value))
	}

	public resetForm(): void {
		this.form.reset()
		// this.additionalPropComp.resetControls()
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
			relatedProducts: [{ value: '' }],
		})
	}

	public remove() {
		console.log('remove')
	}
}

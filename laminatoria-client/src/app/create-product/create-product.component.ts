import { Component, OnInit, ViewChild } from '@angular/core'
import { ProductsService } from '../services/products.service'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
	selector: 'app-create-product',
	templateUrl: './create-product.component.html',
	styleUrls: ['../edit-product/edit-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
	public form: FormGroup

	@ViewChild('adProps') private additionalPropComp
	@ViewChild('props') private props

	public get propertiesFormArray(): FormArray {
		return this.form.controls['properties'] as FormArray
	}

	public get additionalProps(): FormControl {
		return this.form.controls['additional'] as FormControl
	}
	constructor(private productService: ProductsService, private fb: FormBuilder) {}

	ngOnInit(): void {
		this.initForm()
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
			id: '0',
			name: [{ value: '', disabled: false }, Validators.required],
			vendor: [{ value: '', disabled: false }, Validators.required],
			categorid: [{ value: '', disabled: false }, Validators.required],
			properties: this.fb.array([]),
			additional: this.fb.group({
				name: [{ value: '', disabled: false }],
				values: [{ value: [], disabled: false }],
			}),
			type: [{ value: '', disabled: false }, Validators.required],
			typeOfMeasurement: [{ value: '', disabled: false }, Validators.required],
			price: [{ value: '', disabled: false }, Validators.required],
			relatedProducts: [{ value: '' }],
		})
	}
}

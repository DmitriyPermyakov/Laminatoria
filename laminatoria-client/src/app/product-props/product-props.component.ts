import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'

@Component({
	selector: 'app-product-props',
	templateUrl: './product-props.component.html',
	styleUrls: ['./product-props.component.scss'],
})
export class ProductPropsComponent implements OnInit {
	@Input() props: FormArray

	public get propsFormGroup(): FormGroup[] {
		return this.props.controls as FormGroup[]
	}

	public newPropForm: FormGroup

	constructor(private fb: NonNullableFormBuilder) {}

	ngOnInit(): void {
		this.newPropForm = this.fb.group({
			id: [{ value: 0, disabled: false }],
			property: [{ value: '', disabled: false }, Validators.required],
			value: [{ value: '', disabled: false }, Validators.required],
		})
	}

	public addValue(): void {
		let form = this.fb.group({
			id: [{ value: 0, disabled: false }],
			property: [{ value: this.newPropForm.value.property, disabled: false }, Validators.required],
			value: [{ value: this.newPropForm.value.value, disabled: false }, Validators.required],
		})

		this.props.push(form)
		this.newPropForm.reset()
	}

	public removeValue(index: number): void {
		this.props.removeAt(index)
	}
}

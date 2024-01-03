import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormControlState } from '@angular/forms'
import { AdditionalProperty } from '../classes/product'

@Component({
	selector: 'app-additional-props',
	templateUrl: './additional-props.component.html',
	styleUrls: ['./additional-props.component.scss'],
})
export class AdditionalPropsComponent implements OnInit {
	@Input() public additionalProps: FormControl
	private resetValues = { name: '', values: [] }

	ngOnInit(): void {
		this.InitResetValues()
	}

	public changePropName(event): void {
		if (event.value !== '') {
			this.additionalProps.value.name = event.value
		}
	}

	public addAdditionalProp(event): void {
		if (event.value !== '' && !this.additionalProps.value.values.includes(event.value)) {
			this.additionalProps.value.values.push(event.value)
		}
		event.value = ''
	}

	public removeAdditionalProp(i: number): void {
		let arr = Array.from(this.additionalProps.value.values)
		arr.splice(i, 1)
		this.additionalProps.value.values = arr
		console.log(this.additionalProps.value.values)
	}

	public resetControls(): void {
		this.additionalProps.value.name = this.resetValues.name
		this.additionalProps.value.values = this.resetValues.values
	}

	private InitResetValues(): void {
		this.resetValues.name = this.additionalProps.value.name
		this.resetValues.values = Array.from(this.additionalProps.value.values)
	}
}
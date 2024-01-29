import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { typeOfProduct } from '../classes/product'

@Component({
	selector: 'app-additional-props',
	templateUrl: './additional-props.component.html',
	styleUrls: ['./additional-props.component.scss'],
})
export class AdditionalPropsComponent implements OnInit {
	@Input() public additionalProps: FormGroup
	private resetValues = { name: '', values: '' }

	ngOnInit(): void {
		// this.InitResetValues()
	}

	public changePropName(event): void {
		if (event.value !== '') {
			this.additionalProps.value.name = event.value
		}
	}

	public addAdditionalProp(event): void {
		let propsArray: string[] = this.additionalProps.value.values.trim().split(' ')
		if (event.value !== '' && !propsArray.includes(event.value)) {
			this.additionalProps.value.values = this.additionalProps.value.values + ' ' + event.value
		}
		event.value = ''
	}

	public removeAdditionalProp(i: number): void {
		let propsArray: string[] = this.additionalProps.value.values.trim().split(' ')
		propsArray.splice(i, 1)
		this.additionalProps.value.values = propsArray.join(' ')
	}

	// public resetControls(): void {
	// 	this.additionalProps.value.name = this.resetValues.name
	// 	this.additionalProps.value.values = this.resetValues.values
	// }

	// private InitResetValues(): void {
	// 	if (this.additionalProps.value !== '') {
	// 		this.resetValues.name = this.additionalProps.value.name
	// 		this.resetValues.values = this.additionalProps.value.values
	// 	}
	// }
}

import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
	selector: 'app-additional-props',
	templateUrl: './additional-props.component.html',
	styleUrls: ['./additional-props.component.scss'],
})
export class AdditionalPropsComponent implements OnInit {
	@Input() public additionalProps: FormGroup
	public propsArray: string[] = []

	ngOnInit(): void {
		if (this.additionalProps.value.values.trim())
			this.propsArray = this.additionalProps.value.values.trim().split(' ')
	}

	public changePropName(event): void {
		if (event.value !== '') {
			this.additionalProps.value.name = event.value
		}
	}

	public addAdditionalProp(event): void {
		if (event.value !== '' && !this.propsArray.includes(event.value)) {
			this.propsArray.push(event.value)
			this.additionalProps.value.values = this.propsArray.join(' ')
		}
		event.value = ''
	}

	public removeAdditionalProp(i: number): void {
		this.propsArray.splice(i, 1)
		this.additionalProps.value.values = this.propsArray.join(' ')
	}

	public resetArray(): void {
		this.propsArray = []
	}
}

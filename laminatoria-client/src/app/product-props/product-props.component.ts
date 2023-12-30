import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Properties } from '../classes/properties'

@Component({
	selector: 'app-product-props',
	templateUrl: './product-props.component.html',
	styleUrls: ['./product-props.component.scss'],
})
export class ProductPropsComponent implements OnInit {
	@Input() props: FormControl
	@ViewChild('propField') name: ElementRef
	@ViewChild('valueField') value: ElementRef

	private resetValues: Properties[] = []

	ngOnInit(): void {
		this.resetValues = this.initResetPropsValues()
	}

	public onChangeExitstingPropName(event, i: number): void {
		if (event.value !== '') {
			this.props.value[i].property = event.value
		}
	}

	public onChangeExistingPropValue(event, i: number): void {
		if (event.value !== '') {
			this.props.value[i].value = event.value
		}
	}

	public onChangePropName(event: Event): void {
		event.preventDefault()
		this.value.nativeElement.focus()
	}

	public onChangeValue(event: Event): void {
		if (this.name.nativeElement.value === '') {
			event.preventDefault()
			this.name.nativeElement.focus()
			return
		}

		if (this.value.nativeElement.value === '') {
			event.preventDefault()
			return
		}

		this.setValues()
		this.clearInputs()
	}

	public addValue(): void {
		if (this.name.nativeElement.value === '' || this.value.nativeElement.value === '') {
			this.name.nativeElement.focus()
			return
		}

		this.setValues()
		this.clearInputs()
	}

	public removeValue(index: number): void {
		let arr = Array.from(this.props.value)
		arr.splice(index, 1)
		this.props.patchValue(arr)
	}

	private setValues(): void {
		this.props.setValue([
			...this.props.value,
			{
				id: '0',
				property: this.name.nativeElement.value,
				value: this.value.nativeElement.value,
			},
		])
	}

	public resetPropsValues(): void {
		for (let i = 0; i < this.props.value.length; i++) {
			this.props.value[i].id = this.resetValues[i].id
			this.props.value[i].property = this.resetValues[i].property
			this.props.value[i].value = this.resetValues[i].value
		}
	}

	private clearInputs(): void {
		this.name.nativeElement.value = ''
		this.value.nativeElement.value = ''
	}

	private initResetPropsValues(): Properties[] {
		const value: Properties[] = []

		for (let i = 0; i < this.props.value.length; i++) {
			let prop = new Properties(this.props.value[i].id, this.props.value[i].property, this.props.value[i].value)
			value.push(prop)
		}

		return value
	}
}

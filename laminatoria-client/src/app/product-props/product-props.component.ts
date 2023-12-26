import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
	selector: 'app-product-props',
	templateUrl: './product-props.component.html',
	styleUrls: ['./product-props.component.scss'],
})
export class ProductPropsComponent {
	@Input() props: FormControl
	@ViewChild('propField') name: ElementRef
	@ViewChild('valueField') value: ElementRef

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

	private clearInputs(): void {
		this.name.nativeElement.value = ''
		this.value.nativeElement.value = ''
	}
}

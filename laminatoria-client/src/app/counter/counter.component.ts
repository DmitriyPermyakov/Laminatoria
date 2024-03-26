import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
	selector: 'app-counter',
	templateUrl: './counter.component.html',
	styleUrls: ['./counter.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: CounterComponent,
		},
	],
})
export class CounterComponent implements ControlValueAccessor {
	@Input() value: number
	@Input() disabled: boolean

	@Output() onAmountChanged: EventEmitter<number> = new EventEmitter()

	onChange = (value) => {}
	onTouched = () => {}

	public touched: boolean = false

	public increment(): void {
		this.markAsTouched()
		if (!this.disabled) {
			if (this.value <= 9999) {
				this.value++
				this.onChange(this.value)
				this.onAmountChanged.emit(this.value)
			}
		}
	}

	public decrement(): void {
		this.markAsTouched()
		if (!this.disabled) {
			if (this.value > 1) {
				this.value--
				this.onChange(this.value)
				this.onAmountChanged.emit(this.value)
			}
		}
	}

	writeValue(value: number) {
		this.value = value
	}

	registerOnChange(onChange: any) {
		this.onChange = onChange
	}

	registerOnTouched(onTouched: any) {
		this.onTouched = onTouched
	}

	markAsTouched() {
		if (!this.touched) {
			this.onTouched()
			this.touched = true
		}
	}

	setDisabledState(disabled: boolean): void {
		this.disabled = disabled
	}
}

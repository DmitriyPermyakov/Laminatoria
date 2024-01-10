import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
	selector: 'app-counter',
	templateUrl: './counter.component.html',
	styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
	@Input() value: number
	@Input() disabled: boolean

	@Output() onAmountChanged: EventEmitter<number> = new EventEmitter()

	public increment(): void {
		if (this.value <= 9999) {
			this.value++
			this.onAmountChanged.emit(this.value)
		}
	}

	public decrement(): void {
		if (this.value > 1) {
			this.value--
			this.onAmountChanged.emit(this.value)
		}
	}
}

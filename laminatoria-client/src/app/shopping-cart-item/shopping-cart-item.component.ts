import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { Product } from '../classes/product'

@Component({
	selector: 'app-shopping-cart-item',
	templateUrl: './shopping-cart-item.component.html',
	styleUrls: ['./shopping-cart-item.component.scss'],
})
export class ShoppingCartItemComponent {
	@Input() form: FormGroup
	@Input() index: number
	@Output() onRemoveItem: EventEmitter<number> = new EventEmitter()

	public get product(): Product {
		return this.form.controls['product']?.value
	}

	public get amount(): number {
		return this.form.controls['amount']?.value
	}

	public get additionalPropsValue(): string {
		return this.form.controls['additionalPropValue']?.value
	}

	constructor(public auth: AuthService) {}

	public changeAdditionalProp(event: Event): void {
		this.form.controls['additionalPropValue']?.setValue((event.target as HTMLInputElement).value)
	}

	public removeItem(): void {
		this.onRemoveItem.emit(this.index)
	}
}

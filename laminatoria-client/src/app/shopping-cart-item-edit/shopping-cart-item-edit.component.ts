import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Product } from '../classes/product'

@Component({
	selector: 'app-shopping-cart-item-edit',
	templateUrl: './shopping-cart-item-edit.component.html',
	styleUrls: ['./shopping-cart-item-edit.component.scss'],
})
export class ShoppingCartItemEditComponent implements OnInit {
	@Input() form: FormGroup
	@Input() index: number

	@Output() onRemoveItem: EventEmitter<number> = new EventEmitter()

	public get product(): Product {
		return this.form.controls['product'].value
	}

	public get amount(): number {
		return this.form.controls['amount'].value
	}

	ngOnInit(): void {}

	public removeItem(): void {
		this.onRemoveItem.emit(this.index)
	}
}

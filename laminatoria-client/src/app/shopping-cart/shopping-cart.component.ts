import { Component, OnInit } from '@angular/core'
import { ShoppingCartService } from '../services/shopping-cart.service'
import { FormArray, FormGroup } from '@angular/forms'

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
	public productItems: FormGroup[]
	public form: FormGroup

	public get items(): FormGroup[] {
		return (this.form.controls['items'] as FormArray).controls as FormGroup[]
	}

	public get summary(): number {
		return this.items.reduce((sum, curr) => {
			return sum + parseFloat(curr?.value.sumPrice)
		}, 0)
	}

	constructor(private shoppingCart: ShoppingCartService) {}

	ngOnInit(): void {
		this.form = this.shoppingCart.form
		this.productItems = this.shoppingCart.orderItems
	}

	public removeItem(event: number): void {
		this.shoppingCart.removeFromCart(event)
	}
}

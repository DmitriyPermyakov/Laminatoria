import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { Product } from '../classes/product'

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
	@Input() public product: Product

	public addToCart(): void {}
}

import { Component, Input, OnInit } from '@angular/core'
import { Product, typeOfMeasurementMap } from '../classes/product'
import { ShoppingCartService } from '../services/shopping-cart.service'
import { AuthService } from '../services/auth.service'

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
	@Input() public product: Product
	public typeOfMeasurement: string = ''
	constructor(public auth: AuthService, private shoppingCart: ShoppingCartService) {}

	ngOnInit(): void {
		console.log(this.product)
		this.typeOfMeasurement = typeOfMeasurementMap.get(this.product.typeOfMeasurement)
	}
	public addToCart(): void {
		this.shoppingCart.addToCart(this.product, '')
	}
}

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
	public emptyImage: string = 'assets/empty-image.png'
	public mainImage: string = ''
	public typeOfMeasurement: string = ''
	constructor(public auth: AuthService, private shoppingCart: ShoppingCartService) {}

	ngOnInit(): void {
		this.typeOfMeasurement = typeOfMeasurementMap.get(this.product.typeOfMeasurement)
		if (this.product.images.length > 0) this.mainImage = this.product.images.trim().split(' ')[0]
		else this.mainImage = this.emptyImage
	}

	public addToCart(): void {
		this.shoppingCart.addToCart(this.product, '')
	}
}

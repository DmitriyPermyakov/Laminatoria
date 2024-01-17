import { AfterViewInit, Component, OnInit } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { ProductsService } from '../services/products.service'
import { Product, typeOfMeasurement } from '../classes/product'
import { ActivatedRoute } from '@angular/router'
import { map, switchMap } from 'rxjs'
import { ShoppingCartService } from '../services/shopping-cart.service'
import { CacheService } from '../services/cache.service'

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit, AfterViewInit {
	public product: Product
	public typeOfMeasurement = typeOfMeasurement
	public additionalPropValue: string

	public id: string

	constructor(
		public auth: AuthService,
		private productService: ProductsService,
		private activatedRoute: ActivatedRoute,
		private shoppingCart: ShoppingCartService,
		private cache: CacheService
	) {}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.paramMap.get('id')

		if (this.id !== '') {
			let productsFromCache = this.cache.get('products' + this.cache.productPageNumber)

			if (productsFromCache != undefined) {
				let prod = productsFromCache.find((p) => p.id == this.id)
				if (!prod) {
					this.loadFromServer()
				} else {
					this.product = prod
				}
			} else {
				this.loadFromServer()
			}
		}
	}

	ngAfterViewInit(): void {
		this.additionalPropValue = this.product.additionalProperty.values[0]
	}

	public addToCart(): void {
		this.shoppingCart.addToCart(this.product, this.additionalPropValue)
	}

	public additionalPropChangeValue(event: Event): void {
		this.additionalPropValue = (event.target as HTMLInputElement).value
	}

	private loadFromServer(): void {
		this.productService
			.getAll()
			.pipe(
				map((p) => p.filter((p) => p.id == this.id)),
				switchMap((p) => p)
			)
			.subscribe((p) => {
				this.product = p
			})
	}
}

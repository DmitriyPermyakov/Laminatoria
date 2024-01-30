import { AfterViewInit, Component, OnInit } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { ProductsService } from '../services/products.service'
import { Product, typeOfMeasurement, typeOfMeasurementMap } from '../classes/product'
import { ActivatedRoute, Router } from '@angular/router'
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
	public typeOfMeasurement: string = ''
	public additionalPropValue: string

	public id: string

	constructor(
		public auth: AuthService,
		private productService: ProductsService,
		private activatedRoute: ActivatedRoute,
		private shoppingCart: ShoppingCartService,
		private cache: CacheService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.paramMap.get('id')

		this.loadProduct()
	}

	ngAfterViewInit(): void {
		if (this.product) this.additionalPropValue = this.product.additionalProperty.values.split(' ')[0]
	}

	public addToCart(): void {
		this.shoppingCart.addToCart(this.product, this.additionalPropValue)
	}

	public additionalPropChangeValue(event: Event): void {
		this.additionalPropValue = (event.target as HTMLInputElement).value
	}

	public removeProduct(id: number): void {
		this.productService.removeProduct(id).subscribe(() => {
			console.log('Product was deleted')
			this.router.navigate(['/products'], { queryParams: { category: 'laminate' } })
		})
	}

	private loadProduct(): void {
		if (this.id !== '') {
			let productsFromCache = this.cache.get('products' + this.cache.productPageNumber)

			if (productsFromCache != undefined) {
				this.product = productsFromCache.find((p) => p.id == this.id)
				this.typeOfMeasurement = typeOfMeasurementMap.get(this.product?.typeOfMeasurement) ?? ''

				if (!this.product) this.loadFromServer(+this.id)
			} else {
				this.loadFromServer(+this.id)
			}
		}
	}

	private loadFromServer(id: number): void {
		this.productService.getById(id).subscribe((p) => {
			this.product = p
			this.typeOfMeasurement = typeOfMeasurementMap.get(this.product?.typeOfMeasurement) ?? ''
		})
	}
}

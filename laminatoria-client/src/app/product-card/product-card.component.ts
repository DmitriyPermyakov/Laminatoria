import { AfterViewInit, Component, OnInit } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { ProductsService } from '../services/products.service'
import { Product, typeOfMeasurementMap } from '../classes/product'
import { ActivatedRoute, Router } from '@angular/router'
import { ShoppingCartService } from '../services/shopping-cart.service'
import { CacheService } from '../services/cache.service'
import { UploadImageService } from '../services/upload-image.service'
import { catchError, mergeAll, of, throwError } from 'rxjs'

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit, AfterViewInit {
	public product: Product
	public typeOfMeasurement: string = ''
	public additionalPropValue: string

	public isRemoving: boolean = false

	public imagesArray: string[] = []
	public emptyImage: string = 'assets/empty-image.png'
	public mainImage: string = ''

	public id: string

	constructor(
		public auth: AuthService,
		private productService: ProductsService,
		private activatedRoute: ActivatedRoute,
		private shoppingCart: ShoppingCartService,
		private cache: CacheService,
		private router: Router,
		private imageService: UploadImageService
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
		this.isRemoving = true

		if (this.imagesArray.length > 0) {
			of(this.productService.removeProduct(id), this.imageService.removeAllImages(this.imagesArray))
				.pipe(mergeAll())
				.subscribe(() => {
					this.setState()
					this.router.navigate(['/products'], { queryParams: { category: 'laminate' } })
				})
		} else {
			this.productService.removeProduct(id).subscribe(() => {
				this.setState()
				this.router.navigate(['/products'], { queryParams: { category: 'laminate' } })
			})
		}
	}

	public chooseImage(index: number): void {
		this.mainImage = this.setMainImage(index)
	}

	private setState(): void {
		this.isRemoving = false
		this.cache.shouldUpdateProducts = true
	}

	private loadProduct(): void {
		if (this.id !== '') {
			if (this.cache.shouldUpdateProducts) {
				this.loadFromServer(+this.id)
				return
			}
			let productsFromCache = this.cache.get('products' + this.cache.productPageNumber)

			if (productsFromCache != undefined) {
				this.product = productsFromCache.find((p) => p.id == this.id)

				if (!this.product) this.loadFromServer(+this.id)
				else this.setImageAndTypeOfMeasurement()
			} else {
				this.loadFromServer(+this.id)
			}
		}
	}

	private loadFromServer(id: number): void {
		this.productService.getById(id).subscribe((p) => {
			this.product = p
			this.setImageAndTypeOfMeasurement()
		})
	}

	private setMainImage(index: number): string {
		let slashIndex = this.imagesArray[index].lastIndexOf('/')
		let url = this.imagesArray.slice(index, index + 1).join()
		url = url.slice(0, slashIndex) + '/_big_image_' + url.slice(slashIndex + 1, url.length)
		return url
	}

	private setImageAndTypeOfMeasurement(): void {
		this.typeOfMeasurement = typeOfMeasurementMap.get(this.product?.typeOfMeasurement) ?? ''
		if (this.product.images.trim()) {
			this.imagesArray = this.product.images.trim().split(' ')
			this.mainImage = this.setMainImage(0)
		} else {
			this.mainImage = this.emptyImage
		}
	}
}

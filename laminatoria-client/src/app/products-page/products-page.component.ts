import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FilterService } from '../services/filter.service'
import { Subscription } from 'rxjs'
import { ProductsService } from '../services/products.service'
import { Product } from '../classes/product'
import { CacheService } from '../services/cache.service'

@Component({
	selector: 'app-products-page',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {
	public isOpen: boolean = false
	public products: Product[]
	private category: string = ''

	public currentPage: number
	public pageCount: number
	public elementsOnPage: number = 20

	private routerSub: Subscription

	constructor(
		public filterService: FilterService,
		private activatedRoute: ActivatedRoute,
		private productService: ProductsService,
		private cacheService: CacheService
	) {}

	ngOnInit(): void {
		// this.routerSub = this.router.events.subscribe((event) => {
		// 	if (event instanceof NavigationEnd) {
		// 		console.log(event.url.replace('/products/', ''))
		// 	}
		// })

		let queryParam = this.activatedRoute.snapshot.queryParams['category']
		this.cacheService.productCategory = queryParam
		console.log(queryParam)
		if (this.cacheService.productPageNumber < 0) {
			this.cacheService.productPageNumber = 1
			this.currentPage = 1
			this.loadAndCacheProducts(this.cacheService.productCategory)
		} else {
			this.currentPage = this.cacheService.productPageNumber
			let productsFromCache = this.cacheService.get('products' + this.currentPage)
			if (!productsFromCache) {
				this.loadAndCacheProducts(this.cacheService.productCategory)
			} else {
				this.products = productsFromCache
			}
		}
	}

	openFilter(): void {
		this.isOpen = this.filterService.toggleFilter()
	}

	public loadAndCacheProducts(category: string): void {
		this.productService.getAll(category).subscribe((p) => {
			this.products = p
			this.pageCount = Math.ceil(this.products.length / this.elementsOnPage)
			this.cacheService.set('products' + this.currentPage, p)
		})
	}
}

import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
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
export class ProductsPageComponent implements OnInit, OnDestroy {
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
		private cacheService: CacheService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.routerSub = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.loadProducts()
				return
			}
		})

		this.loadProducts()
	}

	ngOnDestroy(): void {
		if (this.routerSub) this.routerSub.unsubscribe()
	}

	openFilter(): void {
		this.isOpen = this.filterService.toggleFilter()
	}

	private loadProducts(): void {
		let queryParam = this.activatedRoute.snapshot.queryParams['category']
		console.log('query param is', queryParam)
		if (this.cacheService.productCategory !== queryParam) this.cacheService.shouldUpdateProducts = true
		this.cacheService.productCategory = queryParam

		if (this.cacheService.productPageNumber < 0 || this.cacheService.shouldUpdateProducts) {
			this.cacheService.productPageNumber = 1
			this.currentPage = 1
			this.loadFromServerAndCacheProducts(this.cacheService.productCategory)
		} else {
			this.currentPage = this.cacheService.productPageNumber
			let productsFromCache = this.cacheService.get('products' + this.currentPage)
			if (!productsFromCache) {
				this.loadFromServerAndCacheProducts(this.cacheService.productCategory)
			} else {
				this.products = productsFromCache
				this.pageCount = Math.ceil(this.products.length / this.elementsOnPage)
				console.log(this.cacheService.get('products' + this.currentPage))
			}
		}
	}

	private loadFromServerAndCacheProducts(category: string): void {
		this.productService.getAll(category).subscribe((p) => {
			this.products = p
			this.pageCount = Math.ceil(this.products.length / this.elementsOnPage)
			this.cacheService.set('products' + this.currentPage, p)
			this.cacheService.shouldUpdateProducts = false
			console.log(this.cacheService.get('products' + this.currentPage))
		})
	}
}

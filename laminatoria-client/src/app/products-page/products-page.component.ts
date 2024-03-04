import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { FilterService } from '../services/filter.service'
import { Subscription } from 'rxjs'
import { ProductsService } from '../services/products.service'
import { Product } from '../classes/product'
import { CacheService } from '../services/cache.service'
import { Filter } from '../classes/filter'

@Component({
	selector: 'app-products-page',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
	public isOpen: boolean = false
	public products: Product[]

	public currentPage: number
	public pageCount: number
	public elementsOnPage: number = 20

	private category: string = ''
	private isFiltered: boolean = false

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

	public openFilter(): void {
		this.isOpen = this.filterService.toggleFilter()
	}

	public paginate(event: number): void {
		if (this.isFiltered) {
			this.getFilteredProducts(this.filterService.filter)
		} else {
			this.loadProducts()
		}
	}

	public onResetFilter(): void {
		this.isFiltered = false
		this.cacheService.shouldUpdateProducts = true

		this.loadProducts()
	}

	public onApplyFilter(filter: Map<string, string>): void {
		this.getFilteredProducts(filter)
	}

	private getFilteredProducts(filter: Map<string, string>): void {
		this.productService.getFiltered(filter).subscribe((p) => {
			this.isFiltered = true
			this.setProducts(p)
		})
	}

	private loadProducts(): void {
		let queryParam = this.activatedRoute.snapshot.queryParams['category']
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
				// #TODO: products lenght получить с сервера
				this.pageCount = Math.ceil(this.products.length / this.elementsOnPage)
			}
		}
	}

	private loadFromServerAndCacheProducts(category: string): void {
		this.productService.getAll(category).subscribe((p) => {
			this.isFiltered = false
			this.setProducts(p)
		})
	}

	private setProducts(products: Product[]): void {
		this.products = products
		this.pageCount = Math.ceil(this.products.length / this.elementsOnPage)
		this.cacheService.set('products' + this.currentPage, products)

		this.cacheService.shouldUpdateProducts = false
	}
}

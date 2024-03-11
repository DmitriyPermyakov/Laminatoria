import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { FilterService } from '../services/filter.service'
import { Subscription } from 'rxjs'
import { ProductsService } from '../services/products.service'
import { Product } from '../classes/product'
import { CacheService } from '../services/cache.service'
import { Filter } from '../classes/filter'
import { AuthService } from '../services/auth.service'

@Component({
	selector: 'app-products-page',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
	public isOpen: boolean = false
	public products: Product[]

	public currentPage: number = 1
	public pageCount: number = 0
	public elementsOnPage: number = 20
	private amountOfProducts: number = 0

	private routerSub: Subscription

	constructor(
		public filterService: FilterService,
		public auth: AuthService,
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

	public paginate(pageNumber: number): void {
		this.cacheService.productPageNumber = this.currentPage = pageNumber
		this.getProducts(this.filterService.filter, pageNumber, this.elementsOnPage)
	}

	public onResetFilter(): void {
		this.cacheService.shouldUpdateProducts = true
		this.cacheService.productPageNumber = this.currentPage = 1
		this.loadProducts()
	}

	public onApplyFilter(filter: Map<string, string>): void {
		this.getProducts(filter, this.cacheService.productPageNumber, this.elementsOnPage)
	}

	private getProducts(filter: Map<string, string>, currentPage: number, elementsOnPage: number): void {
		this.productService.getFiltered(filter, currentPage, elementsOnPage).subscribe((p) => {
			this.setProducts(p.products)
			this.amountOfProducts = p.totalCount
		})
	}

	private loadProducts(): void {
		let queryParam = this.activatedRoute.snapshot.queryParams['category']

		if (this.cacheService.productCategory !== queryParam) {
			this.cacheService.shouldUpdateProducts = true
			this.cacheService.productCategory = queryParam
		}

		this.cacheService.productCategory = queryParam
		let filter: Map<string, string> = new Map()
		filter.set('category', queryParam)

		if (this.cacheService.shouldUpdateProducts || this.cacheService.productPageNumber < 0) {
			this.cacheService.productPageNumber = this.currentPage = 1
			this.getProducts(filter, this.currentPage, this.elementsOnPage)
		} else {
			this.currentPage = this.cacheService.productPageNumber
			let productsFromCache = this.cacheService.get('products' + this.currentPage)
			if (!productsFromCache) {
				this.getProducts(filter, this.currentPage, this.elementsOnPage)
			} else {
				this.products = productsFromCache
				this.pageCount = Math.ceil(this.amountOfProducts / this.elementsOnPage)
			}
		}
	}

	private setProducts(products: Product[]): void {
		this.products = products
		this.pageCount = Math.ceil(this.amountOfProducts / this.elementsOnPage)
		this.cacheService.set('products' + this.currentPage, products)

		this.cacheService.shouldUpdateProducts = false
	}
}

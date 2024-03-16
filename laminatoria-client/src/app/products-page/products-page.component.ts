import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { FilterService } from '../services/filter.service'
import { Subscription } from 'rxjs'
import { ProductsService } from '../services/products.service'
import { Product } from '../classes/product'
import { CacheService } from '../services/cache.service'
import { AuthService } from '../services/auth.service'
import { PaginationService } from '../services/pagination.service'

@Component({
	selector: 'app-products-page',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
	public isOpen: boolean = false
	public products: Product[]

	public isProductLoading: boolean = true

	public currentPage: number = 1
	public elementsOnPage: number = 1

	private routerSub: Subscription

	constructor(
		public filterService: FilterService,
		public auth: AuthService,
		private activatedRoute: ActivatedRoute,
		private productService: ProductsService,
		private cacheService: CacheService,
		private router: Router,
		private paginationAmountService: PaginationService
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
		this.isProductLoading = true
		this.productService.getFiltered(this.filterService.filter, pageNumber, this.elementsOnPage).subscribe((p) => {
			this.setProducts(p.products)
			this.isProductLoading = false
		})
	}

	public onResetFilter(): void {
		this.cacheService.shouldUpdateProducts = true
		this.loadProducts()
	}

	public onApplyFilter(filter: Map<string, string>): void {
		this.getProducts(filter, 1, this.elementsOnPage)
	}

	private getProducts(filter: Map<string, string>, currentPage: number, elementsOnPage: number): void {
		this.isProductLoading = true
		this.productService.getFiltered(filter, currentPage, elementsOnPage).subscribe((p) => {
			this.cacheService.amountOfProducts = p.totalCount
			this.setProducts(p.products)
			this.isProductLoading = false
			this.cacheService.productPageNumber = 1
			this.currentPage = 1
			this.paginationAmountService.emitValue(p.totalCount)
		})
	}

	private loadProducts(): void {
		let queryParam = this.activatedRoute.snapshot.queryParams['category']

		if (this.cacheService.category !== queryParam) {
			this.cacheService.shouldUpdateProducts = true
			this.cacheService.category = queryParam
		}

		this.cacheService.category = queryParam
		let filter: Map<string, string> = new Map()
		filter.set('category', queryParam)

		if (this.cacheService.shouldUpdateProducts || this.cacheService.productPageNumber < 0) {
			this.getProducts(filter, this.currentPage, this.elementsOnPage)
		} else {
			this.currentPage = this.cacheService.productPageNumber
			let productsFromCache = this.cacheService.get('products' + this.currentPage)
			if (!productsFromCache) {
				this.getProducts(filter, this.currentPage, this.elementsOnPage)
			} else {
				this.isProductLoading = false
				this.products = productsFromCache
				this.paginationAmountService.emitValue(this.cacheService.amountOfProducts)
			}
		}
	}

	private setProducts(products: Product[]): void {
		this.products = products

		this.cacheService.set('products' + this.currentPage, products)
		this.cacheService.shouldUpdateProducts = false
	}
}

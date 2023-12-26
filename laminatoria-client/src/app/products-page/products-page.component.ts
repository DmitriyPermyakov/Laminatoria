import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router'
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

	private routerSub: Subscription

	constructor(
		private router: Router,
		public filterService: FilterService,
		private productService: ProductsService,
		private cacheService: CacheService
	) {}

	ngOnInit(): void {
		this.routerSub = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				console.log(event.url.replace('/products/', ''))
			}
		})

		this.productService.getAll().subscribe((p) => {
			this.products = p
			this.cacheService.set('products', p)
		})
	}

	ngOnDestroy(): void {
		if (this.routerSub) this.routerSub.unsubscribe()
	}

	openFilter(): void {
		this.isOpen = this.filterService.toggleFilter()
	}
}

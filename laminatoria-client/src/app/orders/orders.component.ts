import { Component, OnInit } from '@angular/core'
import { FilterService } from '../services/filter.service'
import { Order } from '../classes/order'
import { OrdersService } from '../services/orders.service'
import { CacheService } from '../services/cache.service'

@Component({
	selector: 'app-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
	public isOpen: boolean = false
	public orders: Order[]
	public currentPage: number
	public pageCount: number
	public elementsOnPage: number = 20

	constructor(
		public filterService: FilterService,
		private orderService: OrdersService,
		private cacheService: CacheService
	) {}

	ngOnInit(): void {
		if (this.cacheService.orderPageNumber < 0 || this.cacheService.shouldUpdateOrders) {
			this.cacheService.orderPageNumber = 1
			this.currentPage = 1
			this.loadAndCacheOrders()
		} else {
			this.currentPage = this.cacheService.orderPageNumber
			let ordersFromCache = this.cacheService.get('orders' + this.currentPage)
			if (!ordersFromCache) {
				this.loadAndCacheOrders()
			} else {
				this.orders = ordersFromCache
				this.pageCount = Math.ceil(this.orders.length / this.elementsOnPage)
			}
		}
	}

	openFilter(): void {
		this.isOpen = this.filterService.toggleFilter()
	}

	private loadAndCacheOrders(): void {
		this.orderService.getAll().subscribe((orders) => {
			this.orders = orders
			this.pageCount = Math.ceil(this.orders.length / this.elementsOnPage)
			this.cacheService.set('orders' + this.currentPage, this.orders)
			this.cacheService.shouldUpdateOrders = false
		})
	}
}

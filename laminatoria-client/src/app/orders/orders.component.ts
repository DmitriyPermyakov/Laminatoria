import { Component, OnInit } from '@angular/core'
import { FilterService } from '../services/filter.service'
import { Order } from '../classes/order'
import { OrdersService } from '../services/orders.service'
import { CacheService } from '../services/cache.service'
import { AuthService } from '../services/auth.service'
import { BehaviorSubject } from 'rxjs'
import { PaginationService } from '../services/pagination.service'

@Component({
	selector: 'app-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
	public isOrdersLoading: boolean = true
	public isOpen: boolean = false
	public orders: Order[]
	public currentPage: number = 1
	public elementsOnPage: number = 20

	constructor(
		public filterService: FilterService,
		private orderService: OrdersService,
		private cacheService: CacheService,
		private paginationAmountService: PaginationService,
		private auth: AuthService
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
				this.isOrdersLoading = false
				this.paginationAmountService.emitValue(1)
			}
		}
	}

	openFilter(): void {
		this.isOpen = this.filterService.toggleFilter()
	}

	public paginate(currentPage: number): void {}

	public onApplyFilter(filter: Map<string, string>): void {}

	public onResetFilter(): void {}

	private loadAndCacheOrders(): void {
		this.isOrdersLoading = true
		this.orderService.getAll().subscribe((orders) => {
			this.cacheService.amountOfOrders = 1
			this.cacheService.orderPageNumber = 1
			this.currentPage = 1
			this.orders = orders
			this.cacheService.set('orders' + this.currentPage, this.orders)
			this.cacheService.shouldUpdateOrders = false
			this.isOrdersLoading = false
			this.paginationAmountService.emitValue(1)
		})
	}
}

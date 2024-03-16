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
		this.loadOrders()
	}

	openFilter(): void {
		this.isOpen = this.filterService.toggleFilter()
	}

	public paginate(currentPage: number): void {
		this.cacheService.orderPageNumber = this.currentPage = currentPage
		this.isOrdersLoading = true
		this.orderService.getFiltered(this.filterService.filter, currentPage, this.elementsOnPage).subscribe((o) => {
			this.setOrders(o.orders)
			this.isOrdersLoading = false
		})
	}

	public onApplyFilter(filter: Map<string, string>): void {
		this.getOrders(filter, 1, this.elementsOnPage)
	}

	public onResetFilter(): void {
		this.cacheService.shouldUpdateOrders = true
		this.loadOrders()
	}

	public loadOrders(): void {
		this.cacheService.category = 'orders'
		let filter: Map<string, string> = new Map()

		if (this.cacheService.orderPageNumber < 0 || this.cacheService.shouldUpdateOrders) {
			this.cacheService.orderPageNumber = 1
			this.currentPage = 1
			this.getOrders(filter, this.currentPage, this.elementsOnPage)
		} else {
			this.currentPage = this.cacheService.orderPageNumber
			let ordersFromCache = this.cacheService.get('orders' + this.currentPage)
			if (!ordersFromCache) {
				this.getOrders(filter, this.currentPage, this.elementsOnPage)
			} else {
				this.orders = ordersFromCache
				this.isOrdersLoading = false
				this.paginationAmountService.emitValue(1)
			}
		}
	}

	private getOrders(filter: Map<string, string>, currentPage: number, elementsOnPage: number): void {
		this.isOrdersLoading = true
		this.orderService.getFiltered(filter, currentPage, elementsOnPage).subscribe((orders) => {
			this.cacheService.amountOfOrders = orders.totalCount
			this.cacheService.orderPageNumber = 1
			this.currentPage = 1
			this.orders = orders.orders
			this.setOrders(orders.orders)
			this.isOrdersLoading = false
			this.paginationAmountService.emitValue(orders.totalCount)
		})
	}

	private setOrders(orders: Order[]): void {
		this.orders = orders
		this.cacheService.set('orders' + this.currentPage, this.orders)
		this.cacheService.shouldUpdateOrders = false
	}
}

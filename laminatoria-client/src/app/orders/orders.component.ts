import { Component, OnInit } from '@angular/core'
import { FilterService } from '../services/filter.service'
import { Order } from '../classes/order'
import { OrdersService } from '../services/orders.service'

@Component({
	selector: 'app-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
	public isOpen: boolean = false
	public orders: Order[]

	constructor(public filterService: FilterService, private orderService: OrdersService) {}

	ngOnInit(): void {
		this.orderService.getAll().subscribe((orders) => {
			this.orders = orders
		})
	}

	openFilter(): void {
		this.isOpen = this.filterService.toggleFilter()
	}
}

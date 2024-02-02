import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { CacheService } from '../services/cache.service'
import { Order } from '../classes/order'
import { OrdersService } from '../services/orders.service'

@Component({
	selector: 'app-order-position',
	templateUrl: './order-position.component.html',
	styleUrls: ['./order-position.component.scss'],
})
export class OrderPositionComponent implements OnInit {
	public id: string
	public order: Order

	constructor(
		private activatedRoute: ActivatedRoute,
		private cacheService: CacheService,
		private orderService: OrdersService,
		private router: Router
	) {
		this.id = this.activatedRoute.snapshot.params['id']
	}

	ngOnInit(): void {
		if (this.id !== '') {
			let orders: Order[] = this.cacheService.get('orders' + this.cacheService.productPageNumber)
			if (orders == undefined) this.loadFromServer()
			else {
				let order = orders.filter((o) => o.id == +this.id)[0]
				if (!order) {
					this.loadFromServer()
				}
			}
		}
	}

	public removeOrder(): void {
		this.orderService.removeOrder(+this.id).subscribe(() => {
			this.router.navigate(['orders'])
			this.cacheService.shouldUpdateOrders = true
		})
	}

	private loadFromServer(): void {
		this.orderService.getById(this.id).subscribe((o) => {
			this.order = o
		})
	}
}

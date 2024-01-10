import { Component, Input } from '@angular/core'
import { Order } from '../classes/order'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
	selector: 'app-order-item',
	templateUrl: './order-item.component.html',
	styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent {
	@Input() order: Order

	constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

	public navigateToDetails(): void {
		let id = this.activatedRoute.snapshot.params['id']
		if (id == undefined) {
			this.router.navigate(['orders', this.order.id])
		}
	}
}

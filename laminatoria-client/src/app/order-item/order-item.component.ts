import { Component, Input } from '@angular/core'
import { Order } from '../classes/order'
import { ActivatedRoute } from '@angular/router'

@Component({
	selector: 'app-order-item',
	templateUrl: './order-item.component.html',
	styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent {
	@Input() order: Order

	constructor(private activatedRoute: ActivatedRoute) {}

	public navigateToDetails(): void {
		if (this.activatedRoute.snapshot.params['id'] === '') {
			console.log('empty id')
		}
	}
}

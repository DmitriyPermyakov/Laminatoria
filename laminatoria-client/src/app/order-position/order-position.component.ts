import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
	selector: 'app-order-position',
	templateUrl: './order-position.component.html',
	styleUrls: ['./order-position.component.scss'],
})
export class OrderPositionComponent {
	public id: string

	constructor(private activatedRoute: ActivatedRoute) {
		this.id = this.activatedRoute.snapshot.params['id']

		if (this.id !== '') {
		}
	}
}

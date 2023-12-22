import { Component } from '@angular/core'
import { FilterService } from '../services/filter.service'

@Component({
	selector: 'app-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
	public isOpen: boolean = false

	constructor(public filterService: FilterService) {}

	openFilter(): void {
		this.isOpen = this.filterService.toggleFilter()
	}
}

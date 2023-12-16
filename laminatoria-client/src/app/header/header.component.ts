import { Component } from '@angular/core'
import { FilterService } from '../services/filter.service'

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	public isMenuOpened: boolean = false

	constructor(public filterService: FilterService) {}

	public toggle(): void {
		if (this.filterService.isFilterOpen) {
			this.filterService.toggleFilter()
		} else {
			this.isMenuOpened = !this.isMenuOpened
		}
	}
}

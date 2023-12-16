import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router'
import { FilterService } from '../services/filter.service'

@Component({
	selector: 'app-products-page',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {
	public isOpen: boolean = false
	private category: string = ''

	constructor(private router: Router, public filterService: FilterService) {}

	ngOnInit(): void {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				console.log(event.url.replace('/products/', ''))
			}
		})
	}

	openFilter(): void {
		this.isOpen = this.filterService.toggleFilter()
	}
}

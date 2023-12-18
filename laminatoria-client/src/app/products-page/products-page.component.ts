import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router'
import { FilterService } from '../services/filter.service'
import { Subscription } from 'rxjs'

@Component({
	selector: 'app-products-page',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
	public isOpen: boolean = false
	private category: string = ''

	private routerSub: Subscription

	constructor(private router: Router, public filterService: FilterService) {}

	ngOnInit(): void {
		this.routerSub = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				console.log(event.url.replace('/products/', ''))
			}
		})
	}

	ngOnDestroy(): void {
		if (this.routerSub) this.routerSub.unsubscribe()
	}

	openFilter(): void {
		this.isOpen = this.filterService.toggleFilter()
	}
}

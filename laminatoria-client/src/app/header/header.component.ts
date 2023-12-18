import { Component, OnDestroy, OnInit } from '@angular/core'
import { FilterService } from '../services/filter.service'
import { NavigationEnd, Router } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	public isMenuOpened: boolean = false

	private routerSub: Subscription

	constructor(public filterService: FilterService, private router: Router) {}

	ngOnInit(): void {
		this.routerSub = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) this.isMenuOpened = false
		})
	}

	ngOnDestroy(): void {
		if (this.routerSub) this.routerSub.unsubscribe()
	}

	public toggle(): void {
		if (this.filterService.isFilterOpen) {
			this.filterService.toggleFilter()
		} else {
			this.isMenuOpened = !this.isMenuOpened
		}
	}
}

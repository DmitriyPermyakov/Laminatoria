import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { FilterService } from '../services/filter.service'
import { NavigationEnd, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from '../services/auth.service'

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	public isMenuOpened: boolean = false
	@Output() public onNavigate: EventEmitter<string> = new EventEmitter()

	private routerSub: Subscription

	constructor(public filterService: FilterService, public auth: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.routerSub = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) this.isMenuOpened = false
		})

		console.log('is authenticated ', this.auth.isAuthenticated)
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

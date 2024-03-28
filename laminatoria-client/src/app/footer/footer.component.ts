import { Component, OnDestroy, OnInit } from '@angular/core'
import { UserService } from '../services/user.service'
import { User } from '../classes/user'
import { NavigationEnd, Router } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
	public phone: string = ''
	private routerSub: Subscription

	constructor(private userService: UserService, private router: Router) {}

	ngOnInit(): void {
		this.routerSub = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd && event.url !== '/') {
				console.log('not main')
			}
		})
		this.userService.getUserInfo().subscribe((user: User) => {
			if (user) this.phone = user.phone
		})
	}

	ngOnDestroy(): void {
		if (this.routerSub) this.routerSub.unsubscribe()
	}
}

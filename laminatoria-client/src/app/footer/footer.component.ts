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
	public isShowed: boolean = true

	private isMain: boolean = true
	private isMobile: boolean = false
	private routerSub: Subscription

	constructor(private userService: UserService, private router: Router) {}

	ngOnInit(): void {
		this.isMobileDevice()
		this.showFooter()
		this.getPhone()
	}

	ngOnDestroy(): void {
		if (this.routerSub) this.routerSub.unsubscribe()
	}

	private getPhone(): void {
		this.userService.getUserInfo().subscribe((user: User) => {
			if (user) this.phone = user.phone
		})
	}

	private showFooter(): void {
		this.routerSub = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.isMainPage(event.url)

				if (this.isMain) return (this.isShowed = true)
				else if (!this.isMobile) return (this.isShowed = true)
				else if (!this.isMain && this.isMobile) return (this.isShowed = false)
				console.log('is show', this.isShowed)
			}
		})
	}

	private isMobileDevice(): void {
		if (window.innerWidth < 600) this.isMobile = true
		else this.isMobile = false
	}

	private isMainPage(url: string): void {
		if (url !== '/') {
			this.isMain = false
		} else {
			this.isMain = true
		}
	}
}

import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router'

@Component({
	selector: 'app-products-page',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {
	private category: string = ''

	constructor(private router: Router) {}

	ngOnInit(): void {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				console.log(event.url.replace('/products/', ''))
			}
		})
	}
}

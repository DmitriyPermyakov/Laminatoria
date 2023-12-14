import { Component } from '@angular/core'

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	public isOpened: boolean = false

	public openMenu(): void {
		this.isOpened = !this.isOpened
	}
}

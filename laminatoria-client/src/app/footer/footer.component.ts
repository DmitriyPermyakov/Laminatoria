import { Component, OnInit } from '@angular/core'
import { UserService } from '../services/user.service'
import { User } from '../classes/user'

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
	public phone: string = ''

	constructor(private userService: UserService) {}

	ngOnInit(): void {
		this.userService.getUserInfo().subscribe((user: User) => {
			if (user) this.phone = user.phone
		})
	}
}

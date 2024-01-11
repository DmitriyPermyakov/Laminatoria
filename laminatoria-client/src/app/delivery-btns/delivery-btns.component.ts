import { Component, Input } from '@angular/core'
import { AuthService } from '../services/auth.service'

@Component({
	selector: 'app-delivery-btns',
	templateUrl: './delivery-btns.component.html',
	styleUrls: ['./delivery-btns.component.scss'],
})
export class DeliveryBtnsComponent {
	@Input() public editMode: boolean = false
	@Input() public disabled: boolean = false
	@Input() public orderId: string

	constructor(public authService: AuthService) {}
}

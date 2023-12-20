import { Component } from '@angular/core'
import { AuthService } from '../services/auth.service'

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
	constructor(public auth: AuthService) {}
}

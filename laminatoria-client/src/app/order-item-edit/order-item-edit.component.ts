import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
	selector: 'app-order-item-edit',
	templateUrl: './order-item-edit.component.html',
	styleUrls: ['./order-item-edit.component.scss'],
})
export class OrderItemEditComponent {
	@Input() form: FormGroup
	@Input() summary: number
}

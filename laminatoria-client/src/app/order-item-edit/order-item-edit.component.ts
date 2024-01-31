import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
	selector: 'app-order-item-edit',
	templateUrl: './order-item-edit.component.html',
	styleUrls: ['./order-item-edit.component.scss'],
})
export class OrderItemEditComponent implements OnInit {
	@Input() form: FormGroup
	@Input() summary: number

	ngOnInit(): void {
		console.log(this.form.value)
	}
}

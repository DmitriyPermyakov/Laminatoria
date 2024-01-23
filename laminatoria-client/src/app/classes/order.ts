import { Contacts } from './contacts'
import { OrderItem } from './orderItem'

export class Order {
	id: number
	contacts: Contacts
	address: string
	comment: string
	date: Date
	orderItems: OrderItem[]
	delivery: string
	summary: number

	constructor(
		id: number,
		contacts: Contacts,
		address: string,
		comment: string,
		date: Date,
		orderItems: OrderItem[],
		delivery: string
	) {
		this.id = id
		this.contacts = contacts
		this.address = address
		this.comment = comment
		this.date = date
		this.orderItems = orderItems
		this.delivery = delivery

		this.summary = orderItems.reduce((sum, curr) => {
			return sum + curr.product.price * curr.amount
		}, 0)
	}
}

import { Contacts } from './contacts'
import { OrderItem } from './orderItem'

export class Order {
	id: number
	contacts: Contacts
	status: number
	address: string
	comments: string
	date: Date
	orderItems: OrderItem[]
	delivery: string
	summary: number

	constructor(
		id: number,
		contacts: Contacts,
		status: number,
		address: string,
		comments: string,
		date: Date,
		orderItems: OrderItem[],
		delivery: string,
		summary: number
	) {
		this.id = id
		this.contacts = contacts
		this.status = status
		this.address = address
		this.comments = comments
		this.date = date
		this.orderItems = orderItems
		this.delivery = delivery
		this.summary = summary
	}
}

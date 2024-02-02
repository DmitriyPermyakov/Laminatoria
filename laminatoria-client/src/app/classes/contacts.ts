export class Contacts {
	id: number
	name: string
	email: string
	phone: string
	orderId: number

	constructor(id: number, name: string, email: string, phone: string, orderId: number) {
		this.id = id
		this.name = name
		this.email = email
		this.phone = phone
		this.orderId = orderId
	}
}

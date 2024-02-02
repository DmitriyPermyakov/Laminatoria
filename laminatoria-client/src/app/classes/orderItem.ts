import { Product } from './product'

export class OrderItem {
	id: number
	product: Product
	amount: number
	additionalPropValue: string
	orderId: number

	constructor(id: number, product: Product, amount: number, additionalPropValue: string, orderId: number) {
		this.id = id
		this.product = product
		this.amount = amount
		this.additionalPropValue = additionalPropValue
		this.orderId = orderId
	}
}

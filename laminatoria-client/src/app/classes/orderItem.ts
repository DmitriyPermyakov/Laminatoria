import { Product } from './product'

export class OrderItem {
	id: number
	product: Product
	amount: number
	additionalPropValue: string
	orderId: number
	sumPrice: number

	constructor(
		id: number,
		product: Product,
		amount: number,
		additionalPropValue: string,
		orderId: number,
		sumPrice: number
	) {
		this.id = id
		this.product = product
		this.amount = amount
		this.additionalPropValue = additionalPropValue
		this.orderId = orderId
		this.sumPrice = sumPrice
	}
}

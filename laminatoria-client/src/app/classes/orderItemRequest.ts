export class OrderItemRequest {
	id: number
	amount: number
	additionalPropValue: string
	orderId: number
	productId: number

	constructor(id: number, amount: number, additionalPropValue: string, orderId: number, productId: number) {
		this.id = id
		this.amount = amount
		this.additionalPropValue = additionalPropValue
		this.orderId = orderId
		this.productId = productId
	}
}

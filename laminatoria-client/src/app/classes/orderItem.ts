import { Product } from './product'

export class OrderItem {
	id: number
	product: Product
	amount: number
	additionalPropValue: string
	//вариант добавочного свойства

	constructor(id: number, product: Product, amount: number, additionalPropValue: string) {
		this.id = id
		this.product = product
		this.amount = amount
		this.additionalPropValue = additionalPropValue
	}
}

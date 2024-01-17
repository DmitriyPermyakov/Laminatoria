import { Product } from './product'

export class OrderItem {
	product: Product
	amount: number
	additionalPropValue: string
	//вариант добавочного свойства

	constructor(product: Product, amount: number, additionalPropValue: string) {
		this.product = product
		this.amount = amount
		this.additionalPropValue = additionalPropValue
	}
}

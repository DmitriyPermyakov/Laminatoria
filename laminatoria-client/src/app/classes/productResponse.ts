import { Product } from './product'

export class ProductResponse {
	public products: Product[]
	public totalCount: number

	constructor(products: Product[], totalCount: number) {
		this.products = products
		this.totalCount = totalCount
	}
}

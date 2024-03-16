import { Order } from './order'

export class OrderResponse {
	public orders: Order[]
	public totalCount: number

	constructor(orders: Order[], totalCount: number) {
		this.orders = orders
		this.totalCount = totalCount
	}
}

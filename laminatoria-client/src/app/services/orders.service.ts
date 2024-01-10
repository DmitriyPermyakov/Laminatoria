import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Order } from '../classes/order'

@Injectable({
	providedIn: 'root',
})
export class OrdersService {
	constructor() {}

	public getAll(): Observable<Order[]> {
		let orderString = localStorage.getItem('order')
		let order = JSON.parse(orderString)
		let orders: Order[] = []
		orders.push(order)

		return new Observable((observer) => {
			observer.next(orders)
			observer.complete()
		})
	}

	public getById(id: string): Observable<Order> {
		let orderString = localStorage.getItem('order')
		let order = JSON.parse(orderString)

		return new Observable((observer) => {
			observer.next(order)
		})
	}
}

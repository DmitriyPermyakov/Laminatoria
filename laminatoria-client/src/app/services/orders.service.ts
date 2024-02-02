import { Injectable } from '@angular/core'
import { Observable, catchError, of, throwError } from 'rxjs'
import { Order } from '../classes/order'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment.development'
import { OrderRequest } from '../classes/orderRequest'

@Injectable({
	providedIn: 'root',
})
export class OrdersService {
	constructor(private http: HttpClient) {}

	public getAll(): Observable<Order[]> {
		return this.http.get<Order[]>(`${environment.ordersUrl}/getAll`).pipe(
			catchError((error) => {
				throwError(() => console.log(error))
				return []
			})
		)
	}

	public getById(id: string): Observable<Order> {
		return this.http
			.get<Order>(`${environment.ordersUrl}/getById/${+id}`)
			.pipe(catchError((error) => throwError(() => console.log(error))))
	}

	public updateOrder(order: OrderRequest): Observable<void> {
		return this.http
			.put<any>(`${environment.ordersUrl}/update`, order)
			.pipe(catchError((error) => throwError(() => console.log(error))))
	}

	public createOrder(order: OrderRequest): Observable<number> {
		return this.http.post<number>(`${environment.ordersUrl}/create`, order).pipe(
			catchError((error) => {
				throwError(() => console.log(error))
				return of(0)
			})
		)
	}
}

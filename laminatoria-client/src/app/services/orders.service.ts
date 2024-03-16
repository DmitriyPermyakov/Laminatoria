import { Injectable } from '@angular/core'
import { Observable, catchError, of, throwError } from 'rxjs'
import { Order } from '../classes/order'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment.development'
import { OrderRequest } from '../classes/orderRequest'
import { OrderResponse } from '../classes/orderResponse'

@Injectable({
	providedIn: 'root',
})
export class OrdersService {
	constructor(private http: HttpClient) {}

	public getAll(): Observable<Order[]> {
		return this.http.get<Order[]>(`${environment.ordersUrl}/getAll`).pipe(
			catchError((error) => {
				throwError(() => console.error(error))
				return []
			})
		)
	}

	public getFiltered(
		filter: Map<string, string>,
		currentPage: number,
		elementsOnPage: number
	): Observable<OrderResponse> {
		let params = new HttpParams()

		filter.forEach((value, key) => {
			params = params.append(key, value)
		})

		params = params.append('currentPage', currentPage)
		params = params.append('elementsOnPage', elementsOnPage)

		console.log(params)

		return this.http.get<OrderResponse>(`${environment.ordersUrl}/getFilteredOrders`, { params: params }).pipe(
			catchError((error) => {
				throwError(() => console.error(error))
				return of(null)
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

	public removeOrder(id: number): Observable<void> {
		return this.http
			.delete<any>(`${environment.ordersUrl}/delete/${id}`)
			.pipe(catchError((error) => throwError(() => console.log(error))))
	}
}

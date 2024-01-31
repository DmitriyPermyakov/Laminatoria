import { Injectable } from '@angular/core'
import { Observable, catchError, of, throwError } from 'rxjs'
import { Order } from '../classes/order'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment.development'

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
}

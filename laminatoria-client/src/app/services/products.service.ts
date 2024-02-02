import { Injectable } from '@angular/core'
import { Observable, catchError, of, throwError } from 'rxjs'
import { Product } from '../classes/product'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment.development'

@Injectable({
	providedIn: 'root',
})
export class ProductsService {
	private products: Product[]

	constructor(private http: HttpClient) {}

	public getAll(category: string | null): Observable<Product[]> {
		const params = new HttpParams().set('category', category)
		return this.http.get<Product[]>(`${environment.productsUrl}/getAll`, { params }).pipe(
			catchError((error) => {
				throwError(() => console.error(error))
				return []
			})
		)
	}

	public getById(id: number): Observable<Product> {
		return this.http.get<Product>(`${environment.productsUrl}/getById/${id}`).pipe(
			catchError((error) => {
				throwError(() => console.log(error))
				return of(null)
			})
		)
	}

	public createProduct(product: Product): Observable<number> {
		return this.http.post<number>(`${environment.productsUrl}/create`, product).pipe(
			catchError((error) => {
				throwError(() => console.log(error))
				return of(0)
			})
		)
	}

	public updateProduct(product: Product): Observable<number> {
		return this.http.put<number>(`${environment.productsUrl}/update`, product).pipe(
			catchError((error) => {
				throwError(() => console.log(error))
				return of(0)
			})
		)
	}

	public removeProduct(id: number): Observable<void> {
		return this.http
			.delete<any>(`${environment.productsUrl}/delete/${id}`)
			.pipe(catchError((error) => throwError(() => console.log(error))))
	}

	private handleError(error) {
		return throwError(() => error)
	}
}

import { Injectable } from '@angular/core'
import { Observable, catchError, of, throwError } from 'rxjs'
import { Product } from '../classes/product'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment.development'
import { ProductResponse } from '../classes/productResponse'

@Injectable({
	providedIn: 'root',
})
export class ProductsService {
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

	public getFiltered(
		filter: Map<string, string>,
		currentPage: number,
		elementsOnPage: number
	): Observable<ProductResponse> {
		let params = new HttpParams()

		filter.forEach((value, key) => {
			params = params.append(key, value)
		})

		params = params.append('currentPage', currentPage)
		params = params.append('elementsOnPage', elementsOnPage)

		return this.http.get<ProductResponse>(`${environment.productsUrl}/getFilteredProducts`, { params: params }).pipe(
			catchError((error) => {
				throwError(() => console.error(error))
				return of(null)
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
}

import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, of, throwError } from 'rxjs'
import { environment } from 'src/environments/environment.development'
import { Filter } from '../classes/filter'
import { FormGroup } from '@angular/forms'

@Injectable({
	providedIn: 'root',
})
export class FilterService {
	public isFilterOpen: boolean = false
	public filter: Map<string, string> = new Map()
	public filterCategory: string = ''

	constructor(private http: HttpClient) {}

	toggleFilter(): boolean {
		return (this.isFilterOpen = !this.isFilterOpen)
	}

	public getProductsFiltersFromServer(category: string): Observable<Filter> {
		let params: HttpParams = new HttpParams()
		params = params.append('category', category)
		return this.http.get<Filter>(`${environment.productFiltersUrl}`, { params: params }).pipe(
			catchError((error) => {
				throwError(() => console.error(error))
				return of(null)
			})
		)
	}

	public getOrdersFiltersFromServer(): Observable<Filter> {
		return this.http.get<Filter>(`${environment.orderFiltersUrl}`).pipe(
			catchError((error) => {
				throwError(() => console.error(error))
				return of(null)
			})
		)
	}

	public setFilter(
		category: string,
		pricesGroup: FormGroup,
		filtersGroup: FormGroup,
		filtersFromServer: Filter
	): Map<string, string> {
		this.filter.set('category', category)

		if (pricesGroup.controls['minPrice'].value) this.filter.set('minPrice', pricesGroup.controls['minPrice'].value)
		else this.filter.set('minPrice', filtersFromServer.prices.minPrice.toString())

		if (pricesGroup.controls['maxPrice'].value) this.filter.set('maxPrice', pricesGroup.controls['maxPrice'].value)
		else this.filter.set('maxPrice', filtersFromServer.prices.maxPrice.toString())

		Object.keys(filtersGroup.controls).forEach((k) => {
			if (filtersGroup.controls[k].value.length > 0) {
				this.filter.set(k, filtersGroup.controls[k].value.join())
			} else {
				this.filter.delete(k)
			}
		})

		return this.filter
	}
}

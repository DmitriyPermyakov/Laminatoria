import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, of, throwError } from 'rxjs'
import { environment } from 'src/environments/environment.development'
import { Filter } from '../classes/filter'

@Injectable({
	providedIn: 'root',
})
export class FilterService {
	public isFilterOpen: boolean = false

	constructor(private http: HttpClient) {}

	toggleFilter(): boolean {
		return (this.isFilterOpen = !this.isFilterOpen)
	}

	public getFilters(): Observable<Filter> {
		return this.http.get<Filter>(`${environment.filtersUrl}`).pipe(
			catchError((error) => {
				throwError(() => console.error(error))
				return of(null)
			})
		)
	}
}

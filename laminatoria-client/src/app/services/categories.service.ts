import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, of, throwError } from 'rxjs'
import { Category } from '../classes/category'
import { environment } from 'src/environments/environment.development'

@Injectable({
	providedIn: 'root',
})
export class CategoriesService {
	constructor(private http: HttpClient) {}

	getCategories(): Observable<Category[]> {
		return this.http.get<Category[]>(`${environment.categoriesUrl}/getAll`).pipe(
			catchError((error) => {
				throwError(() => console.log(error))
				return of([])
			})
		)
	}
}

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, of, throwError } from 'rxjs'
import { environment } from 'src/environments/environment.development'

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private http: HttpClient) {}

	getUserInfo(): Observable<any> {
		return this.http.get<any>(`${environment.userUrl}`).pipe(
			catchError((error) => {
				throwError(() => console.error(error))
				return of(null)
			})
		)
	}
}

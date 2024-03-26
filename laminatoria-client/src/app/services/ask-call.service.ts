import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment.development'

@Injectable({
	providedIn: 'root',
})
export class AskCallService {
	constructor(private http: HttpClient) {}

	public askCall(value): Observable<void> {
		return this.http.post<void>(`${environment.askCallUrl}`, value)
	}
}

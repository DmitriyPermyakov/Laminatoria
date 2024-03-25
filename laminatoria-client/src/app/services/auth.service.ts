import { Injectable } from '@angular/core'
import { LoginRequest } from '../classes/loginRequest'
import { Observable, catchError, map, of, throwError } from 'rxjs'
import { AuthenticationResult } from '../classes/authenticationResult'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment.development'
import { RefreshRequest } from '../classes/refreshRequest'
import { Router } from '@angular/router'

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public get refreshTokenString(): string {
		let token = localStorage.getItem('refreshToken')
		if (token != null) return token
		else return ''
	}

	public set refreshTokenString(value: string) {
		localStorage.setItem('refreshToken', value)
	}

	public get accessTokenString(): string {
		let token = localStorage.getItem('accessToken')
		if (token != null) return token
		else return ''
	}

	public set accessTokenString(value: string) {
		localStorage.setItem('accessToken', value)
	}

	public isAuthenticated: boolean = false

	constructor(private http: HttpClient, private router: Router) {
		this.isAuthenticated = this.isTokenExpired()
	}

	public clearTokens(): void {
		localStorage.removeItem('accessToken')
		localStorage.removeItem('refreshToken')
		this.isAuthenticated = false
	}

	public login(loginRequest: LoginRequest): Observable<AuthenticationResult> {
		return this.http.post<AuthenticationResult>(`${environment.loginUrl}`, loginRequest)
	}

	public resetPassword(): Observable<void> {
		return this.http
			.get<void>(`${environment.resetPasswordUrl}`)
			.pipe(catchError((error) => throwError(() => console.error(error))))
	}

	public logout(): Observable<void> {
		return this.http
			.get<void>(`${environment.logoutUrl}`)
			.pipe(catchError((error) => throwError(() => console.error(error))))
	}

	public refreshToken(): Observable<AuthenticationResult> {
		console.log('refreshing token')
		let refreshRequest = new RefreshRequest(this.refreshTokenString)
		return this.http
			.post<AuthenticationResult>(`${environment.refreshUrl}`, refreshRequest)
			.pipe(catchError((error) => throwError(() => console.error(error))))
	}

	public changeEmail(email: string): Observable<void> {
		let headers = new HttpHeaders()
		headers = headers.set('Content-Type', 'application/json; charset=utf-8')
		return this.http
			.post<void>(`${environment.changeEmailUrl}`, '"' + email + '"', { headers: headers })
			.pipe(catchError((error) => throwError(() => console.error(error))))
	}

	public changePassword(password: string): Observable<void> {
		let headers = new HttpHeaders()
		headers = headers.set('Content-Type', 'application/json; charset=utf-8')
		return this.http
			.post<void>(`${environment.changePasswordUrl}`, password, { headers: headers })
			.pipe(catchError((error) => throwError(() => console.error(error))))
	}

	private isTokenExpired(): boolean {
		if (this.accessTokenString === '') return false
		else {
			let exp = JSON.parse(atob(this.accessTokenString.split('.')[1])).exp * 1000
			return new Date() > new Date(exp)
		}
	}
}

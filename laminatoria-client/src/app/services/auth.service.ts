import { Injectable } from '@angular/core'
import { LoginRequest } from '../classes/loginRequest'
import { Observable, catchError, throwError } from 'rxjs'
import { AuthenticationResult } from '../classes/authenticationResult'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment.development'
import { RefreshRequest } from '../classes/refreshRequest'

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

	public get isAuthenticated(): boolean {
		return !this.isTokenExpired(this.accessTokenString)
	}

	public get isRefreshTokenValid(): boolean {
		return !this.isTokenExpired(this.refreshTokenString)
	}

	private isTokenExpired(token: string): boolean {
		if (token != '') {
			console.log('token is', token)
			let exp = JSON.parse(atob(token.split('.')[1])).exp * 1000
			return new Date() > new Date(exp)
		}
		return true
	}

	constructor(private http: HttpClient) {}

	public clearTokens(): void {
		localStorage.removeItem('accessToken')
		localStorage.removeItem('refreshToken')
	}

	public login(loginRequest: LoginRequest): Observable<AuthenticationResult> {
		return this.http.post<AuthenticationResult>(`${environment.loginUrl}`, loginRequest)
	}

	public logout(): Observable<void> {
		return this.http
			.get<void>(`${environment.logoutUrl}`)
			.pipe(catchError((error) => throwError(() => console.log(error))))
	}

	public refreshToken(): Observable<AuthenticationResult> {
		let refreshRequest = new RefreshRequest(this.refreshTokenString)
		return this.http
			.post<AuthenticationResult>(`${environment.refreshUrl}`, refreshRequest)
			.pipe(catchError((error) => throwError(() => console.log(error))))
	}
}

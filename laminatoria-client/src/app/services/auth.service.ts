import { Injectable } from '@angular/core'
import { LoginRequest } from '../classes/loginRequest'
import { Observable, catchError, map, of, throwError } from 'rxjs'
import { AuthenticationResult } from '../classes/authenticationResult'
import { HttpClient } from '@angular/common/http'
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

	public get isAuthenticated(): boolean {
		if (this.accessTokenString === '') return false
		else return true
	}

	// public get isRefreshTokenValid(): boolean {
	// 	return !this.isTokenExpired(this.refreshTokenString)
	// }

	// private isTokenExpired(token: string): boolean {
	// 	try {
	// 		if (token != '') {
	// 			let exp = JSON.parse(atob(token.split('.')[1])).exp * 1000
	// 			return new Date() > new Date(exp)
	// 		}
	// 	} catch (error) {
	// 		this.clearTokens()
	// 		return true
	// 	}

	// 	return true
	// }

	constructor(private http: HttpClient, private router: Router) {}

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
			.pipe(catchError((error) => throwError(() => console.error(error))))
	}

	public refreshToken(): Observable<AuthenticationResult> {
		console.log('refreshing token')
		let refreshRequest = new RefreshRequest(this.refreshTokenString)
		return this.http
			.post<AuthenticationResult>(`${environment.refreshUrl}`, refreshRequest)
			.pipe(catchError((error) => throwError(() => console.error(error))))
	}
}

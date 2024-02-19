import {
	HTTP_INTERCEPTORS,
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
} from '@angular/common/http'
import { Injectable, Provider, inject } from '@angular/core'
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs'
import { AuthService } from '../services/auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private auth = inject(AuthService)

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let cloned = req
		const token = this.auth.accessTokenString
		if (token != '') cloned = this.addTokenToHeader(req, token)

		return next.handle(cloned).pipe(
			catchError((error) => {
				if (error?.status === 401) return this.handleError(cloned, next)

				return throwError(() => console.error(error))
			})
		)
	}

	private addTokenToHeader(req: HttpRequest<any>, token: string) {
		return req.clone({
			headers: req.headers.set('Authorization', 'Bearer ' + token),
		})
	}

	private handleError(req: HttpRequest<any>, next: HttpHandler) {
		const refreshToken = this.auth.refreshTokenString

		if (refreshToken !== '')
			return this.auth.refreshToken().pipe(
				switchMap((response) => {
					this.auth.accessTokenString = response.accessToken
					this.auth.refreshTokenString = response.refreshToken

					return next.handle(this.addTokenToHeader(req, response.accessToken))
				}),
				catchError((error) => {
					this.auth.clearTokens()
					return throwError(() => console.error(error))
				})
			)
		else return next.handle(this.addTokenToHeader(req, refreshToken))
	}
}

export const INTERCEPTOR_PROVIDER: Provider = {
	provide: HTTP_INTERCEPTORS,
	useClass: AuthInterceptor,
	multi: true,
}

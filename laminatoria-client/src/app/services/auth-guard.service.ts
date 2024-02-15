import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable({
	providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
	constructor(private auth: AuthService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		if (this.auth.isAuthenticated) return true
		else {
			if (this.auth.isRefreshTokenValid) {
				this.auth.refreshToken().subscribe((response) => {
					this.auth.accessTokenString = response.accessToken
					if (this.auth.isAuthenticated) {
						this.router.navigate([`${state.url}`])
						return true
					} else {
						return false
					}
				})
			} else {
				this.auth.logout().subscribe(() => {
					this.auth.clearTokens()
					return false
				})
			}
			return false
		}
	}
}

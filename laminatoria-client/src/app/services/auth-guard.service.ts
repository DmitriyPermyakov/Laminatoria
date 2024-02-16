import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router'
import { AuthService } from './auth.service'
import { inject } from '@angular/core'

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
	const auth: AuthService = inject(AuthService)

	return auth.isAuthenticated ? true : false
}

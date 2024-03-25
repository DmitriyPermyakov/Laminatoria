import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'
import { catchError, of, shareReplay } from 'rxjs'
import { AuthenticationResult } from '../classes/authenticationResult'

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
	public loginForm: FormGroup
	public waiting: boolean = false

	constructor(private fb: FormBuilder, public auth: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
			password: [{ value: '', disabled: false }, Validators.required],
		})
	}

	public login(): void {
		this.waiting = true
		this.auth
			.login({ ...this.loginForm.value })
			.pipe(
				shareReplay(),
				catchError((error) => {
					console.log(error)
					this.loginForm.reset()
					this.loginForm.invalid
					this.loginForm.markAllAsTouched()
					this.waiting = false
					this.auth.clearTokens()
					return of(null)
				})
			)
			.subscribe((response) => {
				console.log(response)
				if (response) {
					this.auth.accessTokenString = response.accessToken
					this.auth.refreshTokenString = response.refreshToken
					this.auth.isAuthenticated = true
					this.router.navigate(['orders'])
				}
			})
	}

	public resetPassword(): void {
		this.waiting = true
		this.auth.refreshToken().subscribe(() => {
			this.waiting = false
		})
	}
}

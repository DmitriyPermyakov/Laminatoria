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
	public logining: boolean = false

	constructor(private fb: FormBuilder, public auth: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
			password: [{ value: '', disabled: false }, Validators.required],
		})
	}

	public login(): void {
		this.logining = true
		this.auth
			.login({ ...this.loginForm.value })
			.pipe(
				shareReplay(),
				catchError((error) => {
					console.log(error)
					this.loginForm.reset()
					this.loginForm.invalid
					this.loginForm.markAllAsTouched()
					this.logining = false
					this.auth.clearTokens()
					return of(null)
				})
			)
			.subscribe((response) => {
				console.log(response)
				if (response) {
					console.log('second response', response)
					localStorage.setItem('accessToken', response.accessToken)
					localStorage.setItem('refreshToken', response.refreshToken)
					this.router.navigate(['orders'])
				}
			})
	}
}

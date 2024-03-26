import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatchingValidator } from '../validators/matching.validators'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { catchError, of, tap, throwError } from 'rxjs'

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
	public form: FormGroup
	public loading: boolean = false

	constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.form = this.fb.group(
			{
				firstField: [{ value: '', disabled: false }, [Validators.required]],
				secondField: [{ value: '', disabled: false }, [Validators.required]],
			},
			{ validators: [MatchingValidator.matchFields] }
		)
	}

	public changeEmail(): void {
		this.loading = true
		if (this.form.valid)
			this.auth
				.changeEmail(this.form.controls['firstField'].value)
				.pipe(
					catchError((error) => {
						throwError(() => console.error(error))
						tap(() => this.router.navigate(['orders']))
						return of(null)
					})
				)
				.subscribe(() => {
					this.loading = false
					this.router.navigate(['login'])
				})
	}
}

import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatchingValidator } from '../validators/matching.validators'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'

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
				firstField: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
				secondField: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
			},
			{ validators: [MatchingValidator.matchFields] }
		)
	}

	public changeEmail(): void {
		console.log(this.form.valid)
		this.loading = true
		if (this.form.valid)
			this.auth.changeEmail(this.form.controls['firstField'].value).subscribe(() => {
				this.loading = false
				this.router.navigate(['login'])
			})
	}
}

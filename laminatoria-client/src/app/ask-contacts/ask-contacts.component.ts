import { Component } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { MatchingValidator } from '../validators/matching.validators'
import { AskCallService } from '../services/ask-call.service'
import { catchError, of, tap, throwError } from 'rxjs'

@Component({
	selector: 'app-ask-contacts',
	templateUrl: './ask-contacts.component.html',
	styleUrls: ['./ask-contacts.component.scss'],
})
export class AskContactsComponent {
	public form: FormGroup
	public loading: boolean = false

	constructor(private fb: FormBuilder, private router: Router, private askCallService: AskCallService) {}

	ngOnInit(): void {
		this.form = this.fb.group({
			name: [{ value: '', disabled: false }, [Validators.required]],
			phone: [{ value: '', disabled: false }, [Validators.required]],
		})
	}

	public askCall(): void {
		this.loading = true
		if (this.form.valid)
			this.askCallService
				.askCall(this.form.value)
				.pipe(
					catchError((error) => {
						throwError(() => console.error(error)), tap(() => this.router.navigate(['products']))
						return of(null)
					})
				)
				.subscribe(() => {
					this.loading = false
					this.router.navigate(['/'])
				})
	}
}

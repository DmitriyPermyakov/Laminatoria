import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public get isAuthenticated(): boolean {
		return this._isAuthenticated
	}
	private _isAuthenticated: boolean = false

	constructor() {}
}

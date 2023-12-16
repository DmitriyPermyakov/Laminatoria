import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class FilterService {
	public isFilterOpen: boolean = false

	toggleFilter(): boolean {
		return (this.isFilterOpen = !this.isFilterOpen)
	}
}

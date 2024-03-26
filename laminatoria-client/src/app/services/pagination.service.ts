import { Injectable } from '@angular/core'
import { ReplaySubject } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class PaginationService {
	private data: ReplaySubject<number> = new ReplaySubject(1)
	public data$ = this.data.asObservable()

	emitValue(value: number): void {
		this.data.next(value)
	}
}

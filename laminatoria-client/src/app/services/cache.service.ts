import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class CacheService {
	private cache = new Map<string, any[]>()

	set(key: string, data: any[]): void {
		if (this.cache.has(key)) {
			throw new Error(`Data already exists for key ${key}`)
		}

		this.cache.set(key, data)
	}

	get(key: string): any[] {
		const data = this.cache.get(key)
		return data
	}

	clear(key: string): void {
		this.cache.delete(key)
	}
}

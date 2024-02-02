import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class CacheService {
	public orderPageNumber: number = -1
	public productPageNumber: number = -1
	public shouldUpdateOrders: boolean = false
	public shouldUpdateProducts: boolean = false

	public get productCategory(): string {
		return localStorage.getItem('category')
	}

	public set productCategory(value: string) {
		localStorage.setItem('category', value)
	}

	private cache = new Map<string, any[]>()

	set(key: string, data: any[]): void {
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

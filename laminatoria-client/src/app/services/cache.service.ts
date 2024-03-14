import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class CacheService {
	public orderPageNumber: number = -1
	public productPageNumber: number = -1
	public shouldUpdateOrders: boolean = false
	public shouldUpdateProducts: boolean = false
	public amountOfProducts: number = 0
	public aountOfOrders: number = 0

	public get productCategory(): string {
		return localStorage.getItem('category')
	}

	public set productCategory(value: string) {
		if (value) localStorage.setItem('category', value)
		else localStorage.setItem('category', 'laminate')
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

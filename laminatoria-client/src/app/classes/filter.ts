export class Filter {
	prices: Prices
	filters: Map<string, string[]>
	types: string

	constructor(prices: Prices, filters: Map<string, string[]>) {
		this.prices = prices
		this.filters = filters
	}
}

export class Prices {
	minPrice: number
	maxPrice: number

	constructor(minPrice: number, maxPrice: number) {
		this.minPrice = minPrice
		this.maxPrice = maxPrice
	}
}

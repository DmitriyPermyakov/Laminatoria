import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Category, Product, typeOfMeasurement, typeOfProduct } from '../classes/product'
import { Properties } from '../classes/properties'

@Injectable({
	providedIn: 'root',
})
export class ProductsService {
	private products: Product[]
	constructor() {
		let additional = new Map<string, string[]>()
		additional.set('ширина', ['2', '3', '4'])
		let prop = [new Properties('1', 'Бренд', 'IDEAL')]
		this.products = [
			new Product(
				'asdfaf',
				'Дуб ривьера',
				'1345345345',
				Category.Laminat,
				prop,
				additional,
				typeOfProduct[typeOfProduct['units']],
				typeOfMeasurement[typeOfMeasurement['roublesForUnit']],
				600,
				[]
			),
		]
	}

	public getAll(): Observable<Product[]> {
		return of(this.products)
	}
}

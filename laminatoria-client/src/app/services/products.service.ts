import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { AdditionalProperty, Category, Product, typeOfMeasurement, typeOfProduct } from '../classes/product'
import { Properties } from '../classes/properties'

@Injectable({
	providedIn: 'root',
})
export class ProductsService {
	private products: Product[]
	constructor() {
		let prop = [
			new Properties(1, 'Бренд', 'IDEAL'),
			new Properties(2, 'Толщина', '1.8мм'),
			new Properties(3, 'Бренд', 'IDEAL'),
			new Properties(4, 'Толщина', '1.8мм'),
			new Properties(5, 'Бренд', 'IDEAL'),
			new Properties(6, 'Толщина', '1.8мм'),
			new Properties(7, 'Бренд', 'IDEAL'),
			new Properties(8, 'Толщина', '1.8мм'),
		]
		let additional = new AdditionalProperty(1, 'Ширина', ['2.50', '3', '4'])
		this.products = [
			new Product(
				1,
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
			new Product(
				2,
				'Ясень белый',
				'1345345345',
				Category.Laminat,
				prop,
				additional,
				typeOfProduct[typeOfProduct['units']],
				typeOfMeasurement[typeOfMeasurement['roublesForUnit']],
				600,
				[]
			),
			new Product(
				3,
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
			new Product(
				4,
				'Ясень белый',
				'1345345345',
				Category.Laminat,
				prop,
				additional,
				typeOfProduct[typeOfProduct['units']],
				typeOfMeasurement[typeOfMeasurement['roublesForUnit']],
				600,
				[]
			),
			new Product(
				5,
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
			new Product(
				6,
				'Ясень белый',
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

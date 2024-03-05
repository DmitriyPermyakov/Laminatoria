import { Category } from './category'
import { Properties } from './properties'

export class Product {
	id: number
	name: string
	vendor: string
	category: Category
	properties: Properties[]
	additionalProperty: AdditionalProperty //запрашивать с сервера
	typeOfProduct: number
	typeOfMeasurement: number
	price: number
	relatedProductsId: number[]
	images: string

	constructor(
		id: number,
		name: string,
		vendor: string,
		category: Category, //ламинат, линолеум и тд
		properties: Properties[],
		additionalProperty: AdditionalProperty,
		typeOfProduct: number, // отрезной или штучный
		typeOfMeasurement: number, // руб.шт руб.м2 руб.м
		price: number,
		images: string
	) {
		this.id = id
		this.name = name
		this.vendor = vendor
		this.category = category
		this.properties = properties
		this.additionalProperty = additionalProperty
		this.typeOfProduct = typeOfProduct
		this.typeOfMeasurement = typeOfMeasurement
		this.price = price
		this.images = images
	}
}

export class AdditionalProperty {
	id: number
	name: string
	values: string

	constructor(id: number, name: string, values: string) {
		this.id = id
		this.name = name
		this.values = values
	}
}

export enum typeOfProduct {
	'cutting',
	'units',
}

export const typeOfProductMap: Map<number, string> = new Map()

typeOfProductMap.set(0, 'Отрезной')
typeOfProductMap.set(1, 'Штучный')

export enum typeOfMeasurement {
	'roublesForSquareMeter',
	'roublesForUnit',
}

export const typeOfMeasurementMap: Map<number, string> = new Map()

typeOfMeasurementMap.set(0, 'р./м2')
typeOfMeasurementMap.set(1, 'р./шт.')

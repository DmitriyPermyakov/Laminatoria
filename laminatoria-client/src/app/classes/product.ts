import { Properties } from './properties'

export class Product {
	id: string
	name: string
	vendor: string
	category: Category
	properties: Properties[]
	additionalProperty: AdditionalProperty //запрашивать с сервера
	type: string
	typeOfMeasurement: string
	price: number
	relatedProduct: Product[]

	constructor(
		id: string,
		name: string,
		vendor: string,
		category: Category, //ламинат, линолеум и тд
		properties: Properties[],
		additionalProperty: AdditionalProperty,
		type: string, // отрезной или штучный
		typeOfMeasurement: string, // руб.шт руб.м2 руб.м
		price: number,
		relatedProducts: Product[]
	) {
		this.id = id
		this.name = name
		this.vendor = vendor
		this.category = category
		this.properties = properties
		this.additionalProperty = additionalProperty
		this.type = type
		this.typeOfMeasurement = typeOfMeasurement
		this.price = price
		this.relatedProduct = relatedProducts
	}
}

export class AdditionalProperty {
	id: string
	name: string
	values: string[]

	constructor(id: string, name: string, values: string[]) {
		this.id = id
		this.name = name
		this.values = values
	}
}

export enum typeOfProduct {
	'cutting',
	'units',
}

export enum typeOfMeasurement {
	'roublesForSquareMeter',
	'roublesForUnit',
}

export enum Category {
	Linoleum,
	Laminat,
	Carpetin,
	Vinil,
	Grass,
	Accessories,
}

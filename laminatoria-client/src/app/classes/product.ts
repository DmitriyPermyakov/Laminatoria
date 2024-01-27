import { Properties } from './properties'

export class Product {
	id: number
	name: string
	vendor: string
	category: Category
	properties: Properties[]
	additionalProperty: AdditionalProperty //запрашивать с сервера
	type: string
	typeOfMeasurement: string
	price: number
	relatedProductsId: number[]

	constructor(
		id: number,
		name: string,
		vendor: string,
		category: Category, //ламинат, линолеум и тд
		properties: Properties[],
		additionalProperty: AdditionalProperty,
		type: string, // отрезной или штучный
		typeOfMeasurement: string, // руб.шт руб.м2 руб.м
		price: number,
		relatedProductsId: number[]
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
		this.relatedProductsId = relatedProductsId
	}
}

export class AdditionalProperty {
	id: number
	name: string
	values: string[]

	constructor(id: number, name: string, values: string[]) {
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

//категории в отдельную таблицу
export enum Category {
	Linoleum,
	Laminat,
	Carpetin,
	Vinil,
	Grass,
	Accessories,
}

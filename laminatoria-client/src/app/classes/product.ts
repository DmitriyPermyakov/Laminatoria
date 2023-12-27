import { Properties } from './properties'

export class Product {
	id: string
	name: string
	vendor: string
	category: Category
	properties: Properties[]
	additionalProperty: Map<string, string[]>
	type: string
	typeOfMeasurement: string
	price: number
	relatedProduct: Product[]

	constructor(
		id: string,
		name: string,
		vendor: string,
		category: Category,
		properties: Properties[],
		additionalProperty: Map<string, string[]>,
		type: string,
		typeOfMeasurement: string,
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

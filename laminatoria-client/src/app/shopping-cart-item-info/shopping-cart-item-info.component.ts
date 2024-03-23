import { Component, Input, OnInit } from '@angular/core'
import { OrderItem } from '../classes/orderItem'
import { Product, typeOfMeasurement, typeOfProduct } from '../classes/product'

@Component({
	selector: 'app-shopping-cart-item-info',
	templateUrl: './shopping-cart-item-info.component.html',
	styleUrls: ['./shopping-cart-item-info.component.scss'],
})
export class ShoppingCartItemInfoComponent implements OnInit {
	@Input() item: OrderItem
	@Input() cartIndex: number

	private get product(): Product {
		return this.item.product
	}

	public area: string = ''
	public price: number

	ngOnInit(): void {
		if (this.product.typeOfProduct == typeOfProduct.cutting) {
			this.squareForCutting(this.item.additionalPropValue)
		} else if (
			this.product.typeOfProduct == typeOfProduct.units &&
			this.product.typeOfMeasurement == typeOfMeasurement.roublesForSquareMeter
		) {
			let prop = this.product.properties.find((p) => p.property === 'Количество в упаковке')
			if (prop) {
				this.squareForUnit(prop)
			} else {
				this.area = ''
			}
		} else if (
			this.product.typeOfProduct == typeOfProduct.units &&
			this.product.typeOfMeasurement == typeOfMeasurement.roublesForUnit
		) {
			this.area = ''
		}
	}

	private squareForCutting(propValue): void {
		let value = parseFloat(propValue) * this.item.amount
		this.area = value.toFixed(2) + 'м2'
		this.price = value * this.product.price
	}

	private squareForUnit(propValue): void {
		if (propValue.value.trim().toUpperCase().includes('М2')) {
			let areaInPack = parseFloat(propValue.value.trim().slice(0, propValue.value.trim().length - 1))
			this.area = (areaInPack * this.item.amount).toFixed(2) + 'м2'
			this.price = this.item.amount * this.product.price
		} else {
			let areaInPack = parseFloat(propValue.value.trim())
			this.area = (areaInPack * this.item.amount).toFixed(2) + 'м2'
			this.price = this.item.amount * this.product.price
		}
	}
}

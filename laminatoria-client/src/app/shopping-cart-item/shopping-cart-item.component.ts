import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { Product, typeOfMeasurement, typeOfMeasurementMap, typeOfProduct } from '../classes/product'

@Component({
	selector: 'app-shopping-cart-item',
	templateUrl: './shopping-cart-item.component.html',
	styleUrls: ['./shopping-cart-item.component.scss'],
})
export class ShoppingCartItemComponent implements OnInit, AfterViewInit {
	@Input() form: FormGroup
	@Input() index: number
	@Output() onRemoveItem: EventEmitter<number> = new EventEmitter()

	public get product(): Product {
		return this.form.controls['product']?.value
	}

	public get amount(): number {
		return this.form.controls['amount']?.value
	}

	public get additionalPropsValue(): string {
		return this.form.controls['additionalPropValue']?.value
	}

	public get price(): number {
		return this.form.controls['sumPrice']?.value
	}

	public area: string

	constructor(public auth: AuthService) {}

	ngOnInit(): void {}
	ngAfterViewInit(): void {
		console.log('price', this.price)
		if (this.product.typeOfProduct == typeOfProduct.cutting) {
			this.form.controls['additionalPropValue']?.valueChanges.subscribe((changes) => {
				let value = parseFloat(changes) * this.amount
				this.area = value + 'м2'
				this.form.controls['sumPrice'].setValue(value * this.product.price)
			})
			this.form.controls['amount']?.valueChanges.subscribe((changes) => {
				let value = parseFloat(this.additionalPropsValue) * changes
				this.area = value + 'м2'
				this.form.controls['sumPrice'].setValue(value * this.product.price)
			})
		} else if (
			this.product.typeOfProduct == typeOfProduct.units &&
			this.product.typeOfMeasurement == typeOfMeasurement.roublesForSquareMeter
		) {
			let prop = this.product.properties.find((p) => p.property === 'Количество в упаковке')
			if (prop) {
				this.form.controls['amount']?.valueChanges.subscribe((changes) => {
					if (prop.value.trim().toUpperCase().includes('М2')) {
						let areaInPack = parseFloat(prop.value.trim().slice(0, prop.value.trim().length - 1))
						this.area = areaInPack * this.amount + 'м2'
						this.form.controls['sumPrice']?.setValue(this.amount * this.product.price)
					} else {
						let areaInPack = parseFloat(prop.value.trim())
						this.area = areaInPack * this.amount + 'м2'
					}
				})
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

	public changeAdditionalProp(event: Event): void {
		this.form.controls['additionalPropValue']?.setValue((event.target as HTMLInputElement).value)
	}

	public removeItem(): void {
		this.onRemoveItem.emit(this.index)
	}
}

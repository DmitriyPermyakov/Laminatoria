import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core'
import { FilterService } from '../services/filter.service'
import { Filter, Prices } from '../classes/filter'
import { FormArray, FormGroup, NonNullableFormBuilder } from '@angular/forms'

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
	@Output() public OnFilterApply: EventEmitter<Filter> = new EventEmitter()

	public filters: Filter
	public form: FormGroup
	public checked: boolean

	public minPrice: string
	public maxPrice: string
	public propsMap: Map<string, string[]> = new Map()
	public propsMapKeys: string[]

	public get pricesGroup(): FormGroup {
		return this.form.controls['prices'] as FormGroup
	}

	public get filtersGroup(): FormGroup {
		return this.form.controls['filters'] as FormGroup
	}

	constructor(private filtersService: FilterService, private nfb: NonNullableFormBuilder) {}

	ngOnInit(): void {
		this.filtersService.getFilters().subscribe((f) => {
			this.filters = f
			if (this.filters) {
				this.propsMap = new Map(Object.entries(this.filters.filters))
				this.propsMapKeys = Array.from(this.propsMap.keys())
				this.initForm()
				this.minPrice = 'от: ' + this.filters.prices.minPrice
				this.maxPrice = 'до: ' + this.filters.prices.maxPrice
			}
		})
	}

	public onChangePrice(event: any): void {
		event.target.value = +event.target.value
	}

	public onChange(event: any, key: string): void {
		let value = event.target.value
		let array = this.filtersGroup.controls[key] as FormArray

		if (event.target.checked) {
			array.push(this.nfb.control(value))
		} else {
			let index = array.controls.findIndex((c) => c.value == value)
			if (index > -1) array.removeAt(index)
		}
	}

	public onSubmit(): void {
		let minPrice = this.pricesGroup.controls['minPrice'].value
		let maxPrice = this.pricesGroup.controls['maxPrice'].value

		let prices: Prices = new Prices(minPrice, maxPrice)
		console.log(this.filtersGroup.controls)

		let filters: Map<string, string[]> = new Map()
		this.propsMapKeys.forEach((key) => {
			filters.set(key, (this.filtersGroup.controls[key] as FormArray).value)
		})

		let filter: Filter = new Filter(prices, filters)

		this.OnFilterApply.emit(filter)
	}

	public resetForm(): void {
		this.checked = false

		this.form.reset()
		this.propsMapKeys.forEach((key) => {
			;(this.filtersGroup.controls[key] as FormArray).clear()
		})
	}

	private initForm(): void {
		let groupValues = this.initProps()
		this.form = this.nfb.group(groupValues)
	}

	private initProps(): Object {
		let groups = new Object()

		groups['prices'] = this.nfb.group({
			minPrice: [{ value: '', disabled: false }],
			maxPrice: [{ value: '', disabled: false }],
		})

		let propFilter: Object = new Object()
		this.propsMap.forEach((value, key) => {
			propFilter[key] = this.nfb.array([])
		})

		groups['filters'] = this.nfb.group(propFilter)

		return groups
	}
}

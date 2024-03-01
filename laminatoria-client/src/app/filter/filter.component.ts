import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core'
import { FilterService } from '../services/filter.service'
import { Filter, Prices } from '../classes/filter'
import { FormArray, FormGroup, NonNullableFormBuilder } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
	@Output() public OnFilterApply: EventEmitter<Map<string, string>> = new EventEmitter()

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

	constructor(
		private filtersService: FilterService,
		private nfb: NonNullableFormBuilder,
		private route: ActivatedRoute
	) {}

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
		let filter: Map<string, string> = new Map()
		let category = this.route.snapshot.queryParams['category']

		filter.set('category', category)

		if (this.pricesGroup.controls['minPrice'].value)
			filter.set('minPrice', this.pricesGroup.controls['minPrice'].value)
		else filter.set('minPrice', this.filters.prices.minPrice.toString())

		if (this.pricesGroup.controls['maxPrice'].value)
			filter.set('maxPrice', this.pricesGroup.controls['maxPrice'].value)
		else filter.set('maxPrice', this.filters.prices.maxPrice.toString())

		Object.keys(this.filtersGroup.controls).forEach((k) => {
			if (this.filtersGroup.controls[k].value.length > 0) {
				filter.set(k, this.filtersGroup.controls[k].value.join())
			}
		})

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

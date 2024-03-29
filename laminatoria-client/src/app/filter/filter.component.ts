import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FilterService } from '../services/filter.service'
import { Filter } from '../classes/filter'
import { FormArray, FormGroup, NonNullableFormBuilder } from '@angular/forms'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { CacheService } from '../services/cache.service'
import { Subscription } from 'rxjs'

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
	@Output() public OnFilterApply: EventEmitter<Map<string, string>> = new EventEmitter()
	@Output() public OnFilterReset: EventEmitter<void> = new EventEmitter()

	public filtersFromServer: Filter
	public form: FormGroup
	public isChecked: boolean

	public isFilterLoading: boolean = true

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

	public checkedCheckboxes: HTMLElement[] = []
	private routerSub: Subscription

	constructor(
		private filtersService: FilterService,
		private nfb: NonNullableFormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private cache: CacheService
	) {}

	ngOnInit(): void {
		this.routerSub = this.router.events.subscribe((e) => {
			if (e instanceof NavigationEnd)
				if (this.cache.category !== this.filtersService.filterCategory) {
					this.updateFilters()
					return
				}
		})

		this.updateFilters()
	}

	public onChangePrice(event: any): void {
		event.target.value = +event.target.value
	}

	public onChange(event: any, key: string): void {
		let value = event.target.value
		let array = this.filtersGroup.controls[key] as FormArray

		if (event.target.checked) {
			if (!Array.from(array.value).includes(value)) {
				array.push(this.nfb.control(value))
				this.checkedCheckboxes.push(event.target as HTMLElement)
			}
		} else {
			let checkBoxIndex = this.checkedCheckboxes.findIndex((c) => c.id == (event.target as HTMLElement).id)
			if (checkBoxIndex > -1) this.checkedCheckboxes.splice(checkBoxIndex, 1)
			let index = array.controls.findIndex((c) => c.value == value)
			if (index > -1) array.removeAt(index)
		}
	}

	public onSubmit(): void {
		let filter: Map<string, string> = this.setFilter()
		this.filtersService.isFilterOpen = false
		this.OnFilterApply.emit(filter)
	}

	public resetForm(): void {
		this.form.reset()
		this.propsMapKeys.forEach((key) => {
			;(this.filtersGroup.controls[key] as FormArray).clear()
		})

		this.checkedCheckboxes.forEach((c) => ((c as HTMLInputElement).checked = false))

		this.isChecked = false
		this.setFilter()
		this.OnFilterReset.emit()
	}

	private updateFilters(): void {
		this.isFilterLoading = true
		this.filtersService.filterCategory = this.cache.category

		if (this.cache.category == 'orders') {
			this.filtersService.getOrdersFiltersFromServer().subscribe((f) => {
				this.makeSettings(f)
			})
		} else {
			this.filtersService.getProductsFiltersFromServer(this.cache.category).subscribe((f) => {
				this.makeSettings(f)
			})
		}
	}

	private makeSettings(filter: Filter): void {
		if (filter.filters) {
			this.filtersFromServer = filter
			this.propsMap = new Map(Object.entries(this.filtersFromServer.filters))
			this.propsMapKeys = Array.from(this.propsMap.keys())
			this.initForm()
			this.minPrice = 'от: ' + this.filtersFromServer.prices.minPrice
			this.maxPrice = 'до: ' + this.filtersFromServer.prices.maxPrice
			this.isFilterLoading = false
		} else {
			this.form = null
			this.isFilterLoading = false
		}
	}
	private setFilter(): Map<string, string> {
		let category = this.cache.category
		return this.filtersService.setFilter(category, this.pricesGroup, this.filtersGroup, this.filtersFromServer)
	}

	private initForm(): void {
		let groupValues = this.initProps()
		this.form = this.nfb.group(groupValues)
		this.setFilter()
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

		if (this.filtersService.filter.size > 0) {
			this.filtersService.filter.forEach((value, key) => {
				switch (key) {
					case 'category':
						break
					case 'minPrice':
					case 'maxPrice':
						;(groups['prices'] as FormGroup).controls[key].setValue(value)
						break
					default:
						;((groups['filters'] as FormGroup).controls[key] as FormArray).push(this.nfb.control(value))

						break
				}
			})
		}

		return groups
	}
}

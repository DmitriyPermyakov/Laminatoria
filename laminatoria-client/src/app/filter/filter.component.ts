import { Component, OnInit } from '@angular/core'
import { FilterService } from '../services/filter.service'
import { Filter } from '../classes/filter'
import { FormArray, FormGroup, NonNullableFormBuilder } from '@angular/forms'

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
	public filters: Filter
	public form: FormGroup

	public minPrice: string
	public maxPrice: string
	public propsMap: Map<string, string[]> = new Map()

	public get Prices(): FormGroup {
		return this.form.controls['prices'] as FormGroup
	}

	public get Filters(): FormGroup {
		return this.form.controls['filters'] as FormGroup
	}

	constructor(private filtersService: FilterService, private nfb: NonNullableFormBuilder) {}

	ngOnInit(): void {
		this.filtersService.getFilters().subscribe((f) => {
			this.filters = f

			if (this.filters) {
				this.minPrice = 'от: ' + this.filters.prices.minPrice
				this.maxPrice = 'до: ' + this.filters.prices.maxPrice
				this.propsMap = new Map(Object.entries(this.filters.filters))

				this.initForm()
			}
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

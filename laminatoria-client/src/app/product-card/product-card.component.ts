import { Component, OnInit } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { ProductsService } from '../services/products.service'
import { Product, typeOfMeasurement } from '../classes/product'
import { ActivatedRoute } from '@angular/router'
import { map, switchMap } from 'rxjs'

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
	public product: Product
	public typeOfMeasurement = typeOfMeasurement

	public id: string

	constructor(
		public auth: AuthService,
		private productService: ProductsService,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.paramMap.get('id')

		if (this.id !== '') {
			this.productService
				.getAll()
				.pipe(
					map((p) => p.filter((p) => p.id == this.id)),
					switchMap((p) => p)
				)
				.subscribe((p) => {
					this.product = p
				})
		}
	}
}

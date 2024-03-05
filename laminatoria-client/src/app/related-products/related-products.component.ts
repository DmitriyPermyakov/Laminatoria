import { Component, OnInit } from '@angular/core'
import { ProductsService } from '../services/products.service'
import { Product } from '../classes/product'

@Component({
	selector: 'app-related-products',
	templateUrl: './related-products.component.html',
	styleUrls: ['./related-products.component.scss'],
})
export class RelatedProductsComponent implements OnInit {
	public related: Product[] = []
	private accessories: string = 'accessories'

	constructor(private productService: ProductsService) {}

	ngOnInit(): void {
		this.productService.getAll(this.accessories).subscribe((p) => {
			this.related = p
		})
	}
}

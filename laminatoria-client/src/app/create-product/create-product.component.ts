import { Component, OnInit } from '@angular/core'
import { ProductsService } from '../services/products.service'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CategoriesService } from '../services/categories.service'
import { Category } from '../classes/category'
import { Router } from '@angular/router'
import { CacheService } from '../services/cache.service'
import { UploadImageService } from '../services/upload-image.service'
import { HttpEventType, HttpResponse } from '@angular/common/http'
import { catchError, throwError } from 'rxjs'
import { environment } from 'src/environments/environment.development'

@Component({
	selector: 'app-create-product',
	templateUrl: './create-product.component.html',
	styleUrls: ['../edit-product/edit-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
	public form: FormGroup
	public categories: Category[]

	public get propertiesFormArray(): FormArray {
		return this.form.controls['properties'] as FormArray
	}

	public get additionalProps(): FormGroup {
		return this.form.controls['additionalProperty'] as FormGroup
	}

	public emptyImage: string = 'assets/empty-image.png'
	public mainImage: string = ''

	public uploading: boolean = false
	public images: string = ''
	public imagesArray: string[] = []

	constructor(
		private productService: ProductsService,
		private fb: FormBuilder,
		private categoriesService: CategoriesService,
		private router: Router,
		private cache: CacheService,
		private imageService: UploadImageService
	) {}

	ngOnInit(): void {
		this.categoriesService.getCategories().subscribe((c) => {
			this.categories = c
		})
		this.initForm()

		this.mainImage = this.setMainImage(0)
	}

	public uploadImage(files) {
		this.uploading = true

		this.imageService
			.uploadImage(files)
			.pipe(catchError((error) => throwError(() => console.error(error))))
			.subscribe((event) => {
				if (event.type === HttpEventType.Response) {
					this.images = this.images.concat(' ', event.body.url).trim()
					this.form.controls['images'].setValue(this.images)
					this.imagesArray = this.images.trim().split(' ')
					this.mainImage = this.setMainImage(this.imagesArray.length - 1)
				}
			})
			.add(() => {
				this.uploading = false
			})
	}

	public onSubmit(): void {
		this.productService.createProduct(this.form.value).subscribe((id) => {
			if (id > 0) {
				this.router.navigate(['/products', id])
				this.cache.shouldUpdateProducts = true
			}
		})
	}

	public chooseImage(index: number): void {
		this.mainImage = this.setMainImage(index)
	}

	public removeImage(index: number): void {
		let imageSplittedUrl = this.imagesArray[index].split('/')
		let imageName = imageSplittedUrl[imageSplittedUrl.length - 1]

		this.imageService
			.removeImage(imageName)
			.pipe(catchError((error) => throwError(() => console.error(error))))
			.subscribe(() => {
				this.imagesArray.splice(index, 1)
				this.images = this.imagesArray.join(' ')
				this.mainImage = this.setMainImage(this.imagesArray.length - 1)
			})
	}

	public resetForm(): void {
		this.form.reset()
	}

	private initForm(): void {
		this.form = this.fb.group({
			id: '0',
			name: [{ value: '', disabled: false }, Validators.required],
			vendor: [{ value: '', disabled: false }, Validators.required],
			category: [{ value: '', disabled: false }, Validators.required],
			properties: this.fb.array([]),
			additionalProperty: this.fb.group({
				id: [{ value: 0, disabled: false }],
				name: [{ value: '', disabled: false }],
				values: [{ value: '', disabled: false }],
			}),
			typeOfProduct: [{ value: '', disabled: false }, Validators.required],
			typeOfMeasurement: [{ value: '', disabled: false }, Validators.required],
			price: [{ value: '', disabled: false }, Validators.required],
			images: [{ value: '', disabled: false }],
		})
	}

	private setMainImage(index: number): string {
		if (this.imagesArray.length > 0) {
			let slashIndex = this.imagesArray[index].lastIndexOf('/')
			let url = this.imagesArray.slice(index, index + 1).join()
			url = url.slice(0, slashIndex) + '/_big_image_' + url.slice(slashIndex + 1, url.length)
			return url
		} else return this.emptyImage
	}
}

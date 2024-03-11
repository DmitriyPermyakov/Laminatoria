import { Component, Input, OnInit } from '@angular/core'
import { UploadImageService } from '../services/upload-image.service'
import { catchError, throwError } from 'rxjs'
import { HttpEventType } from '@angular/common/http'
import { FormControl } from '@angular/forms'

@Component({
	selector: 'app-images',
	templateUrl: './images.component.html',
	styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
	@Input() imagesControl: FormControl
	public emptyImage: string = 'assets/empty-image.png'
	public mainImage: string = ''

	public isUploadingImage: boolean = false

	public images: string = ''
	public imagesArray: string[] = []

	constructor(private imageService: UploadImageService) {}

	ngOnInit(): void {
		this.images = this.imagesControl.value.trim()
		this.imagesArray = this.images.split(' ')
		this.mainImage = this.setMainImage(0)
	}

	public uploadImage(files) {
		this.isUploadingImage = true

		this.imageService
			.uploadImage(files)
			.pipe(catchError((error) => throwError(() => console.error(error))))
			.subscribe((event) => {
				if (event.type === HttpEventType.Response) {
					this.images = this.images.concat(' ', event.body.url).trim()
					this.imagesControl.setValue(this.images)
					this.imagesArray = this.images.trim().split(' ')
					this.mainImage = this.setMainImage(this.imagesArray.length - 1)
				}
			})
			.add(() => {
				this.isUploadingImage = false
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

	public removeAllImages(): void {
		this.imageService.removeAllImages(this.imagesArray).subscribe()
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

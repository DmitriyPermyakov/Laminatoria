import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment.development'

@Injectable({
	providedIn: 'root',
})
export class UploadImageService {
	constructor(private http: HttpClient) {}

	public uploadImage(files): Observable<any> {
		if (files.length === 0) return null
		let fileToUpload = <File>files.item(0)
		let formData = new FormData()
		formData.append('file', fileToUpload, fileToUpload.name)

		return this.http.post<any>(`${environment.imageUlrUpload}`, formData, { reportProgress: true, observe: 'events' })
	}

	public removeImage(imageName: string): Observable<any> {
		return this.http.delete<any>(`${environment.imageUrlRemove}/${imageName}`)
	}

	public removeAllImages(images: string[]): Observable<any> {
		let params = new HttpParams()
		images.forEach((i) => {
			params = params.append('images', i)
		})
		return this.http.delete<any>(`${environment.imageUrlRemoveAll}`, { params })
	}
}

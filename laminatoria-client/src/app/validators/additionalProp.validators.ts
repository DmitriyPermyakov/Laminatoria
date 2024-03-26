import { FormGroup } from '@angular/forms'
import { typeOfProduct } from '../classes/product'

export class AdditionalPropValidator {
	static additionalPropIncluded(fg: FormGroup): { [key: string]: boolean } {
		let typeOfProd = fg.controls['typeOfProduct'].value
		let propNameValue = (fg.controls['additionalProperty'] as FormGroup).controls['name'].value
		let propValuesValue = (fg.controls['additionalProperty'] as FormGroup).controls['values'].value

		if (typeOfProd == typeOfProduct.cutting) {
			if (propNameValue !== '' && propValuesValue !== '') return null
			else return { emptyAdditionalProp: true }
		} else return null
	}
}

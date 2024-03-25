import { FormControl, FormGroup } from '@angular/forms'

export class MatchingValidator {
	static matchFields(fg: FormGroup): { [key: string]: boolean } {
		return fg.controls['firstField']?.value === fg.controls['secondField']?.value ? null : { mismatch: true }
	}
}

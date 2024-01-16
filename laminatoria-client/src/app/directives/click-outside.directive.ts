import { Directive, HostListener } from '@angular/core'

@Directive({
	selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
	@HostListener('click', ['$event.target'])
	public onClick(target) {
		if (target.classList.contains('add-product-container')) {
			target.classList.remove('visible')
		}
	}
}

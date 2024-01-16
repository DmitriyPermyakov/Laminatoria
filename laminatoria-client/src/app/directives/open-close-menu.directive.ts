import { Directive, HostListener } from '@angular/core'

@Directive({
	selector: '[appOpenCloseMenu]',
})
export class OpenCloseMenuDirective {
	@HostListener('click', ['$event.target'])
	public onClick(target) {
		if (target.nextSibling.classList.contains('opened')) {
			target.nextSibling.classList.remove('opened')
		} else {
			target.nextSibling.classList.add('opened')
		}
	}
}

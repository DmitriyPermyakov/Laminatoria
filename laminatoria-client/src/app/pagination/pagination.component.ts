import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	HostListener,
	Input,
	OnInit,
	Output,
	Renderer2,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core'

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent implements AfterViewInit {
	@ViewChild('container') container: ElementRef
	@Input() pageCount: number = 1
	@Input() currentPage: number = 1
	@Input() elementsOnPage: number = 20

	@Output() onPageChanged: EventEmitter<number> = new EventEmitter()

	private spanClass: string = 'pagination-dots'
	private buttonClass: string = 'pagination-btn'
	private firstSpan: HTMLElement = null
	private secondSpan: HTMLElement = null
	private buttonsArray: HTMLElement[] = []

	@HostListener('click', ['$event.target'])
	onClick(element: HTMLElement) {
		if (element.classList.contains('pagination-btn')) {
			let number = +element.textContent
			if (number == this.currentPage) return
			else {
				this.setSelectedButton(number)
				this.setVisibleButtons()
				this.setSpanClasses()
				this.onPageChanged.emit(this.currentPage)
			}
		}
	}

	constructor(private renderer: Renderer2) {}

	ngAfterViewInit(): void {
		this.drawButtons()
		this.initButtonsClasses()
		this.setSpanClasses()
		this.setVisibleButtons()
	}

	private drawButtons(): void {
		for (let i = 1; i <= this.pageCount; i++) {
			let button = this.createButton(i)
			this.buttonsArray.push(button)
			if (i === 1) this.firstSpan = this.createSpan()
			if (i === this.pageCount - 1) this.secondSpan = this.createSpan()
		}
	}

	private setSelectedButton(number: number): void {
		this.buttonsArray[this.currentPage - 1]?.classList.remove('selected')
		this.currentPage = number
		this.buttonsArray[this.currentPage - 1]?.classList.add('selected')
	}

	private setVisibleButtons(): void {
		this.initButtonsClasses()

		this.buttonsArray[this.currentPage - 3]?.classList.remove('hidden')
		this.buttonsArray[this.currentPage - 2]?.classList.remove('hidden')
		this.buttonsArray[this.currentPage - 1]?.classList.remove('hidden')
		this.buttonsArray[this.currentPage]?.classList.remove('hidden')
		this.buttonsArray[this.currentPage + 1]?.classList.remove('hidden')
	}

	private initButtonsClasses(): void {
		for (let i = 0; i < this.pageCount; i++) {
			if (i == 0 || i == this.pageCount - 1) continue
			this.buttonsArray[i]?.classList.add('hidden')
		}
		this.buttonsArray[this.currentPage - 1]?.classList.add('selected')
	}

	private setSpanClasses(): void {
		if (this.currentPage < 5) this.firstSpan?.classList.add('hidden')
		else this.firstSpan?.classList.remove('hidden')
		if (this.currentPage >= this.pageCount - 3) this.secondSpan?.classList.add('hidden')
		else this.secondSpan?.classList.remove('hidden')
	}

	private createButton(i: number): HTMLElement {
		let button = this.renderer.createElement('button')
		button.textContent = i.toString()
		this.renderer.addClass(button, this.buttonClass)
		this.renderer.appendChild(this.container.nativeElement, button)
		return button
	}

	private createSpan(): HTMLElement {
		let span = this.renderer.createElement('span')
		span.textContent = '...'
		this.renderer.addClass(span, this.spanClass)
		this.renderer.appendChild(this.container.nativeElement, span)
		return span
	}
}

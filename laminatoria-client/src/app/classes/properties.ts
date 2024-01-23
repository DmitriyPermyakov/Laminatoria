export class Properties {
	public id: number
	public property: string
	public value: string

	constructor(id: number, prop: string, value: string) {
		this.id = id
		this.property = prop
		this.value = value
	}
}

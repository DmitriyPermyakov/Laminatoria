export class Properties {
	public id: string
	public property: string
	public value: string

	constructor(id: string, prop: string, value: string) {
		this.id = id
		this.property = prop
		this.value = value
	}
}

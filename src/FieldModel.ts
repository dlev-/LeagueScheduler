class FieldModel {
	private _name: string;
	private _id: number;

	constructor (name: string, id: number) {
		this._name = name;
		this._id = id;
	}

	get name() {
		return this._name;
	}

	get id() {
		return this._id;
	}

	static deserialize(input: any) : FieldModel {
		if (!input._name) {
			throw Error("field Name must have a value");
		}
		if (!input._id) {
			throw Error("field id must have a value");
		}
		return new FieldModel(input.name, input.id);
	}
}

export default FieldModel;
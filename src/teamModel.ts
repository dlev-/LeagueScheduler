class TeamModel {
	private _teamName: string;
	private _id: number;
	private _byes: Date[];
	private _badDayOfWeek: string;
	private _maxDoubleHeaders: number;
	private _maxStartHour: number;
	private _minStartHour: number;
	private _preferredFields: string[];
	private _changeCallback: () => void;

	constructor(name:string, id:number) {
		this._teamName = name;
		this._id = id;
		this._byes = [];
		this._preferredFields = [];
	}

	setChangeCallback(changeCallback: () => void) {
		this._changeCallback = changeCallback;
	}

	get teamName() {
		return this._teamName;
	}

	get id() {
		return this._id;
	}

	get byes():Date[] {
		return this._byes;
	}
	set byes(val:Date[]){
		this._byes = val;
		this.modelChanged();
	}

	get minStartHour(): number {
		return this._minStartHour;
	}
	set minStartHour(val: number) {
		this._minStartHour = val;
		this.modelChanged();
	}

	get maxDoubleHeaders(): number {
		return this._maxDoubleHeaders;
	}
	set maxDoubleHeaders(val: number) {
		this._maxDoubleHeaders = val;
		this.modelChanged();
	}

	get maxStartHour(): number {
		return this._maxStartHour;
	}
	set maxStartHour(val: number) {
		this._maxStartHour = val;
		this.modelChanged();
	}

	get preferredFields(): string[] {
		return this._preferredFields || [];
	}
	set preferredFields(val: string[]) {
		this._preferredFields = val;
		this.modelChanged();
	}

	get badDayOfWeek(): string {
		return this._badDayOfWeek;
	}
	set badDayOfWeek(val: string) {
		this._badDayOfWeek = val;
		this.modelChanged();
	}

	// called when the model changed in any way.
	private modelChanged() {
		if (this._changeCallback) {
			this._changeCallback();
		}
	}

	static deserialize(input: any) : TeamModel {
		if (!input.teamName) {
			throw Error("teamName must have a value");
		}
		var team = new TeamModel(input.teamName, input.id)
		team._byes = input.byes;
		team._badDayOfWeek = input.badDayOfWeek;
		team._maxDoubleHeaders = input.maxDoubleHeaders;
		team._maxStartHour = input.maxStartHour;
		team._minStartHour = input.minStartHour;
		team._preferredFields = input.preferredFields;
		return team;
	}

	serialize() {
		var toRet:any = {};
		toRet.teamName = this._teamName;
		toRet.id = this._id;
		toRet.byes = this._byes;
		toRet.badDayOfWeek = this._badDayOfWeek;
		toRet.maxDoubleHeaders = this._maxDoubleHeaders;
		toRet.maxStartHour = this._maxStartHour;
		toRet.minStartHour = this._minStartHour;
		toRet.preferredFields = this._preferredFields;
		return toRet;
	}
}


export default TeamModel;
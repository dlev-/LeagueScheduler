import DateUtils from "./DateUtils";

class GameDateTime
{
	private _day: Date;
	private _time: number;

	constructor(day: Date, time: number) {
		this._day = day;
		this._time = time;
	}

	get day():Date {
		return this._day;
	}

	get time():number {
		return this._time;
	}

	public equals(otherGDT: GameDateTime): boolean {
		return this.day == otherGDT.day && this.time == otherGDT.time;
	}

	public toString() {
		return DateUtils.niceStringForDate(this.day) + " " + this.time;
	}
}


export default GameDateTime;
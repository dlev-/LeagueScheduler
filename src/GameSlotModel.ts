import MatchupModel from "./MatchupModel";

class GameSlotModel {
	private static _idCounter = 0;
	private _day: Date;
	private _time: number;
	private _fieldNum: number;
	private _matchup: MatchupModel;
	private _id: string;
	private _dayTimeKey: string;

	constructor(day: Date, time: number, fieldNum: number) {
		this._day = day;
		this._time = time;
		this._fieldNum = fieldNum;
		this._id = (GameSlotModel._idCounter++).toString();
		this._dayTimeKey = this.day.getUTCFullYear() + "-" + (this.day.getUTCMonth() + 1) + "-" + this.day.getUTCDate() + ":" + this.time.toString();
		this._dayTimeKey = this.day.toUTCString() + this.time.toString();
	}

	get id():string {
		return this._id;
	}

	get day():Date {
		return this._day;
	}

	get time():number {
		return this._time;
	}

	get fieldNum():number {
		return this._fieldNum;
	}

	get dayTimeKey():string {
		return this._dayTimeKey;
	}

	get matchup():MatchupModel {
		return this._matchup;
	}
	set matchup(val:MatchupModel){
		this._matchup = val;
	}

	public static compare(a: GameSlotModel, b: GameSlotModel): number {
		let toRet = a._day.getTime() - b._day.getTime();
		if (toRet == 0) {
			toRet = a._time - b._time;
		}
		return toRet;
	}
}


export default GameSlotModel;
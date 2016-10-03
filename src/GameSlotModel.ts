import MatchupModel from "./MatchupModel";

class GameSlotModel {
	private _day: Date;
	private _time: number;
	private _fieldNum: number;
	private _matchup: MatchupModel;

	constructor(day: Date, time: number, fieldNum: number) {
		this._day = day;
		this._time = time;
		this._fieldNum = fieldNum;
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

	get matchup():MatchupModel {
		return this._matchup;
	}
	set matchup(val:MatchupModel){
		this._matchup = val;
	}
}


export default GameSlotModel;
import TeamModel from "./teamModel";

class ScheduleModel { 
	gameSlots: GameSlotModel[];
}

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

class MatchupModel {
	private _team1: TeamModel;
	private _team2: TeamModel;
	constructor(t1: TeamModel, t2: TeamModel) {
		this.team1 = t1;
		this.team2 = t2;
	}

	get team1():TeamModel {
		return this._team1;
	}

	get team2():TeamModel {
		return this._team2;
	}
}

class FieldModel {
	private name: string;
	private id: number;

	constructor (name: string, id: number) {
		this.name = name;
		this.id = id;
	}
}

export default ScheduleModel;
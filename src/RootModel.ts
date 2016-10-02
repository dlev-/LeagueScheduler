import TeamModel from "./teamModel"; 
import ScheduleModel from "./ScheduleModel"; 

class RootModel {
	private static _version: string = "1.0.0";
	private _teams: TeamModel[];
	private _leagueDiscNWId: number;
	private _leagueName: string;
	//startDate: Date;
	//endDate: Date;
	private _daysOfWeek: number[]; // where sunday is 0
	private _year: number;
	private _schedule: ScheduleModel;

	constructor (discNWId: number, leagueName: string, daysOfWeek: number[], year: number) {
		this._teams = [];
		this._leagueDiscNWId = discNWId;
		this._leagueName = leagueName;
		this._daysOfWeek = daysOfWeek;
		this._year = year;
	}

	addTeam(team: TeamModel) {
		this._teams.push(team);
	}

	static deserialize(input: any): RootModel {
		if (RootModel._version != input.version) {
			throw new Error("input version " + input.version + "doesn't match current version " + RootModel._version);
		}
		if (!input.teams) {
			throw new Error("no teams listed");
		}

		if (!input.leagueDiscNWId) {
			throw new Error("no disc NW league ID");
		}

		if (!input.leagueName) {
			throw new Error("no disc NW league name");
		}

		if (!input.daysOfWeek) {
			throw new Error("no days of week listed");
		}

		if (!input.year || input.year < 2010 || input.year > 2100) {
			throw new Error("no year or bad year: " + input.year);
		}
		var newRoot = new RootModel(input.leagueDiscNWId, input.leagueName, input.daysOfWeek, input.year);

		for (var ii = 0; ii < input.teams.length; ++ii){
			newRoot.addTeam(TeamModel.deserialize(input.teams[ii]));
		}
		return newRoot;
	}

	serialize() {
		var toRet:any = {};
		toRet.version = RootModel._version;
		toRet.teams = [];
		for (var ii = 0; ii < this._teams.length; ++ii){
			toRet.teams.push(this._teams[ii].serialize());
		}
		toRet.leagueDiscNWId = this._leagueDiscNWId;
		toRet.leagueName = this._leagueName;
		toRet.daysOfWeek = this._daysOfWeek;
		toRet.year = this._year;

		return toRet;
	}
}

export default RootModel;
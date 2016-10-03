import TeamModel from "./teamModel";

export class MatchupModel {
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

export default MatchupModel;
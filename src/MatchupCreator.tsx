import * as React from "react";
import * as ReactDOM from "react-dom";
import MatchupGrid from "./MatchupGrid";
import MatchupModel from "./MatchupModel";
import TeamModel from "./TeamModel";

class MatchupCreator {
	private _numGamesPerTeam: number;
	private _teams: TeamModel[];
	private _teamGridModel: number[][] = [];

	public constructor(teams: TeamModel[], numGamesPerTeam: number) {
		this._numGamesPerTeam = numGamesPerTeam;
		this._teams = teams;
		this.initMatchups();
	}

	public getMatchups(): MatchupModel[] {
		var matchups: MatchupModel[] = [];
		for (var ii = 0; ii < this._teams.length; ii++) {
			for (var jj = ii + 1; jj < this._teams.length; ++jj) {
				for (var gg = 0; gg < this._teamGridModel[ii][jj]; ++gg)
				{
					matchups.push(new MatchupModel(this._teams[ii], this._teams[jj]));
				}
			}
		}		
		return matchups;
	}

	private initMatchups() {
		for (var ii = 0; ii < this._teams.length; ii++) {
			this._teamGridModel[ii] = [];
			for (var jj = 0; jj < this._teams.length; ++jj) {
				this._teamGridModel[ii][jj] = jj <= ii ? -1 : 0;
			}
		}
		var gamesPerRow = Math.floor(this._numGamesPerTeam / 2);
		for (var ii = 0; ii < this._teams.length; ii++) {
			for (var jj = ii + 1; jj < this._teams.length && jj - ii <= gamesPerRow; ++jj) {
				this._teamGridModel[ii][jj] += 1;
			}
		}
		// give the top and bottom teams a rematch
		this.initMatchupHelperDoubleEnds(0, 1, 2, gamesPerRow);
		var len = this._teams.length;
		this.initMatchupHelperDoubleEnds(len - 2, len - 1, -2, gamesPerRow);
	}
	private initMatchupHelperDoubleEnds(row: number, col: number, inc: number, gamesPerRow:number) {
		for (var ii = 0; ii < gamesPerRow; ++ii) {
			this._teamGridModel[row][col]++;
			row += inc;
			col += inc;
		}
	}

	public render() {
		var teamNames = _.map(this._teams, (t:TeamModel) => t.teamName);
		ReactDOM.render(
			//<Hello name="Willson" />,
			<MatchupGrid teamNames={teamNames} gridValues={this._teamGridModel} updateCallback={this.updateMatchup}/>,
			document.getElementById("root")
		);	
	}

	private updateMatchup = (x: number, y: number, numMatchups: number) => {
		this._teamGridModel[x][y] = numMatchups;
		this.render();
	}
}
export default MatchupCreator;


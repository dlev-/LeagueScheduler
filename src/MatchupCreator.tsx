import * as React from "react";
import * as ReactDOM from "react-dom";
import MatchupGrid from "./MatchupGrid";

class MatchupCreator {
	teams: string[];
	teamGridModel: number[][] = [];

	public constructor(teams: string[]) {
		this.teams = teams;
		this.initMatchups();
		this.render();
	}

	private initMatchups() {
		var numGamesPerTeam = 6;
		for (var ii = 0; ii < this.teams.length; ii++) {
			this.teamGridModel[ii] = [];
			for (var jj = 0; jj < this.teams.length; ++jj) {
				this.teamGridModel[ii][jj] = jj <= ii ? -1 : 0;
			}
		}
		var gamesPerRow = Math.floor(numGamesPerTeam / 2);
		for (var ii = 0; ii < this.teams.length; ii++) {
			for (var jj = ii + 1; jj < this.teams.length && jj - ii <= gamesPerRow; ++jj) {
				this.teamGridModel[ii][jj] += 1;
			}
		}
		// give the top and bottom teams a rematch
		this.initMatchupHelperDoubleEnds(0, 1, 2, gamesPerRow);
		var len = this.teams.length;
		this.initMatchupHelperDoubleEnds(len - 2, len - 1, -2, gamesPerRow);
	}
	private initMatchupHelperDoubleEnds(row: number, col: number, inc: number, gamesPerRow:number) {
		for (var ii = 0; ii < gamesPerRow; ++ii) {
			this.teamGridModel[row][col]++;
			row += inc;
			col += inc;
		}
	}

	private render() {
		ReactDOM.render(
			//<Hello name="Willson" />,
			<MatchupGrid teamNames={this.teams} gridValues={this.teamGridModel} updateCallback={this.updateMatchup}/>,
			document.getElementById("root")
		);	
	}

	private updateMatchup = (x: number, y: number, numMatchups: number) => {
		this.teamGridModel[x][y] = numMatchups;
		this.render();
	}
}
export default MatchupCreator;


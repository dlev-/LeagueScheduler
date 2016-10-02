import * as React from "react";
import * as ReactDOM from "react-dom";
import BasicTextBox from "./BasicTextBox";
import NumberBox from "./NumberBox";
import TeamModel from "./teamModel";

class TeamManager {
	private _teams: TeamModel[] = [];
	private _year: number;
	private _daysOfWeek: number[];

	constructor(teams: TeamModel[], year: number, daysOfWeek: number[]) {
		this._teams = teams;
		for (var id in teams) {
			teams[id].setChangeCallback(() => this.teamModelsChanged());
		}
		this._year = year;
		this._daysOfWeek = daysOfWeek;
	}

	teamModelsChanged() {
		this.render();
	}

	updateTeamRank = (oldPos: number, newPos: number) => {
		var movedTeam = this._teams[oldPos - 1];
		this._teams.splice(oldPos - 1, 1);
		this._teams.splice(newPos - 1, 0, movedTeam);

		this.render();
	}

	render() {
		ReactDOM.render(
			<TeamGrid teams={this._teams} 
					  updateRankCallback={this.updateTeamRank}
					  year={this._year} 
					  daysOfWeek={this._daysOfWeek}/>, 
			document.getElementById("root")
		);	
	}
}

interface TeamGridProps {
	teams: TeamModel[];
	updateRankCallback: (oldPos: number, newPos: number) => void;
	year: number;
	daysOfWeek: number[];
}

class TeamGrid extends React.Component<TeamGridProps, {}> {

	render() {
		var localProps = this.props;
		return (
			<table>
				<thead>
					<tr>
						{["Rank", "Team", "Byes", "min start hour", "max start hour", "max double headers", "Preferred Fields (;)"].map(function(header) {
							return <th>
								<div>{header}</div>
							</th>;
						}) }
					</tr>
				</thead>
				<tbody>
					{localProps.teams.map(function(team, teamRank) {
						return <TeamRow
							team={team}
							teamRank={teamRank + 1}
							updateRankCallback={localProps.updateRankCallback}
							year={localProps.year} 
							daysOfWeek={localProps.daysOfWeek}
							key={team.teamName + teamRank}/>;
					}) }
				</tbody>
			</table>
		)
	}
}

interface TeamProps {
	team: TeamModel;
	teamRank: number;
	updateRankCallback: (oldPos: number, newPos: number) => void;
	year: number;
	daysOfWeek: number[];
}

class TeamRow extends React.Component<TeamProps, {}> {
	render() {
		var team = this.props.team;
		var teamNameStyle = {
			width: '160px',
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		};
		// "Team", "Byes", "min start hour", "max start hour", "max double headers"
		var byeUpdater = (dates: Date[]) => { 
			team.byes = dates;
		};
		var byeDisplayStr = "";
		if (team.byes) {
			for (var ii = 0; ii < team.byes.length; ++ii) {
				byeDisplayStr += team.byes[ii].toLocaleDateString();
			}
		}

		var preferredFieldUpdater = (text: string) => {
			team.preferredFields = text.split(";");
		}
		return (
			<tr>
				<td><NumberBox num={this.props.teamRank} updateCallback={(newVal: number) => this.props.updateRankCallback(this.props.teamRank, newVal)} commitImmediately={false}/></td>
				<td><div style={teamNameStyle}>{team.teamName}</div></td>
				<td><DateListBox displayDates={byeDisplayStr} updateCallback={byeUpdater} year={this.props.year} daysOfWeek={this.props.daysOfWeek}/></td>
				<td><NumberBox num={team.minStartHour} updateCallback={(newVal: number) => team.minStartHour = newVal} commitImmediately={true}/></td>
				<td><NumberBox num={team.maxStartHour} updateCallback={(newVal: number) => team.maxStartHour = newVal} commitImmediately={true}/></td>
				<td><NumberBox num={team.maxDoubleHeaders} updateCallback={(newVal: number) => team.maxDoubleHeaders = newVal} commitImmediately={true}/></td>
				<td><BasicTextBox text={team.preferredFields.join(";")} updateCallback={preferredFieldUpdater} commitImmediately={false}/></td>
			</tr>
		)
	}
}

interface DateListBoxProps {
	displayDates: string;
	updateCallback: (dates: Date[]) => void;
	year: number; 
	daysOfWeek: number[];
}

interface DateListBoxState {
	displayDates: string;
	validDates: boolean;
}

class DateListBox extends React.Component<DateListBoxProps, DateListBoxState> {

    constructor(props: DateListBoxProps) {
		super(props);
		// set initial state
		this.state = { displayDates: this.props.displayDates, validDates: true };
    }

	handleTextChange(e: any) {
		var newVal = e.target.value;
		var dates = this.parseDateString(newVal);
		var datesValid = newVal.trim().split(" ").length == dates.length;
		this.setState({ displayDates: newVal, validDates: datesValid });
	}

	commitDateList() {
		this.props.updateCallback(this.parseDateString(this.state.displayDates));
	}

	parseDateString(rawDates: string): Date[] {
		var dateStrs = rawDates.split(" ");
		var dates: Date[] = [];
		for (var ii = 0; ii < dateStrs.length; ++ii) {
			var dateCandidate = new Date(dateStrs[ii]);
			if (dateCandidate.getFullYear() != this.props.year) {
				// year is wrong, add it and try again
				dateCandidate = new Date(dateStrs[ii] + "/" + this.props.year);
			}
			if (dateCandidate.getFullYear() == this.props.year &&
				this.props.daysOfWeek.indexOf(dateCandidate.getDay()) >= 0) {
				// the year is right and the day of week is allowed
				dates.push(dateCandidate);
			}
		}

		return dates;
	}

	render() {
		var inputStyle:any = { width: '100px'};
		if (!this.state.validDates) {
			inputStyle.color = "red";
		}
		return <input type='text' 
					  value={ this.state.displayDates } 
					  onChange={ e => this.handleTextChange(e) } 
					  onBlur= { () => this.commitDateList() }
					  style={ inputStyle } />;
	}
}


export default TeamManager;
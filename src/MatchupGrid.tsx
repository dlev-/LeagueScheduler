import * as React from "react";
//npm run build
interface MatchupCellProps {
  teams: string[];
  team1: string;
  team2: string;
  num: number;
  gridValues: number[][];
  updateCallback: (x: number, y: number, num: number) => void;
}

interface MatchupCellState {
  num: number;
}

class MatchupCell extends React.Component<MatchupCellProps, MatchupCellState> {

    constructor(props: MatchupCellProps) {
		super(props);
		// set initial state
		this.state = { num: this.props.num };
    }

  handleTextChange(e :any) {
	  var newVal = parseInt(e.target.value);
	  if (! (newVal >= 0)) {
		  newVal = 0;
	  }
	  var row = this.props.teams.indexOf(this.props.team1);
	  var col = this.props.teams.indexOf(this.props.team2);
	  this.props.gridValues[row][col] = newVal;
	  this.setState({ num: newVal });
      this.props.updateCallback(row, col, newVal);
  }
  render() {
	  if (this.state.num < 0) {
		  return <td></td>;
	  } else {
		  var cellVal = this.state.num ? this.state.num : '';
		  var inputStyle = { width: '20px' };
		  return <td><input type='text' value={ cellVal } onChange={ e => this.handleTextChange(e) } style={ inputStyle }/></td>;
	  }
  }
}

interface MatchupRowProps {
  teams: string[];
  team1: string;
  gridValues: number[][];
  rowNum: number;
  updateCallback: (x: number, y: number, num: number) => void;
}

class MatchupRow extends React.Component<MatchupRowProps, {}> {
  render() {
	  var teamsLocal = this.props.teams;
	  var team1Local = this.props.team1;
	  var gridVals = this.props.gridValues;
	  var rowNum = this.props.rowNum;
	  var rowVals = gridVals[rowNum];
	  var callback = this.props.updateCallback;
	  var team1Sum = 0;
	  for (var ii = 0; ii < rowVals.length; ++ii) {
		  if (rowVals[ii] > 0) { team1Sum += rowVals[ii]; }
	  }
	  for (var ii = 0; ii < gridVals.length; ++ii) {
		  if (gridVals[ii][rowNum] > 0) { team1Sum += gridVals[ii][rowNum] };
	  }
	  var divStyle = {
		  textAlign: 'left',
		  width: '160px',
		  whiteSpace: 'nowrap',
		  overflow: 'hidden'
	  };
	  return (
		<tr className="matchupTableRow" >
	      <MatchupTeamHeader teamName={team1Local} topHeader={false}/>
		  {this.props.teams.map(function(teamName, ii) {
				  return <MatchupCell 
				  	teams={teamsLocal} 
			  		team1={team1Local} 
			  		team2={teamName} 
			  		key={teamName}
			  		num={rowVals[ii]} 
			  		gridValues={gridVals}
					updateCallback={callback}/>;
	      })}
		  <td> <div style={divStyle}>{team1Sum}: {team1Local}</div></td>
	    </tr>
	  )
  }
}

interface MatchupTeamHeaderProps {
	teamName: string;
	topHeader: boolean;
}

class MatchupTeamHeader extends React.Component<MatchupTeamHeaderProps, {}> {
	render() {
		var games = 0;
		var headerStyle = {
			textAlign: 'left',
			width: '80px',
			whiteSpace: 'nowrap',
			overflow: 'hidden'
		};
		if (this.props.topHeader) {
			headerStyle.width = '40px';
		}
		return (
			<th>
				<div style={headerStyle}>{this.props.teamName}</div>
			</th>
		)
	}
}

interface MatchupGridProps {
  teamNames: string[];
  gridValues: number[][];
  updateCallback: (x:number, y:number, num:number) => void;
}

class MatchupGrid extends React.Component<MatchupGridProps, {}> {
  render() {
	var localProps = this.props;
	return (
		<table>
			<thead>
			<tr><th/>
				{localProps.teamNames.map(function(teamName) {
					return <MatchupTeamHeader topHeader={true} teamName= { teamName } key={teamName}/>;
				}) }
			</tr>
			</thead>
			<tbody>
			{localProps.teamNames.map(function(teamName, teamIdx) {
					return <MatchupRow 
								team1={teamName} 
								key={teamName} 
								teams={localProps.teamNames} 
								gridValues={localProps.gridValues} 
								rowNum={teamIdx} 
								updateCallback={localProps.updateCallback} />;
			}) }
			</tbody>
		</table>
	)
  }
}

export default MatchupGrid;
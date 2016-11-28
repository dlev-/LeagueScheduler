import * as React from "react";
import MatchupModel from "./MatchupModel"; 
import GameSlotModel from "./GameSlotModel"; 
import FieldModel from "./FieldModel"; 

interface ScheduleFieldHeaderProps {
	fieldName: string;
}

class ScheduleFieldHeader extends React.Component<ScheduleFieldHeaderProps, {}> {
	render() {
		var games = 0;
		var headerStyle = {
			textAlign: 'left',
			width: '80px',
			whiteSpace: 'nowrap',
			overflow: 'hidden'
		};
		return (
			<th>
				<div style={headerStyle}>{this.props.fieldName}</div>
			</th>
		)
	}
}

interface ScheduleCellProps {
  gsm: GameSlotModel;
}

class ScheduleCell extends React.Component<ScheduleCellProps, {}> {
  render() {
  	let game = this.props.gsm;
  	if (!game) { 
  		return <div>none</div>;
  	} else if (!game.matchup){
		return <div>slot</div>;
  	} else {
	  return (
		<table>
			<tbody>
			<tr><td>{game.matchup.team1.teamName}</td></tr>
			<tr><td>{game.matchup.team2.teamName}</td></tr>
			</tbody>
		</table>	  		
	  );
  	}
  }
}

interface ScheduleRowProps {
  day: Date;
  time: number;
  fieldIds: number[];
  key: string;
  gameSlots: { [fieldId: number] : GameSlotModel;};
}

class ScheduleRow extends React.Component<ScheduleRowProps, {}> {
  render() {
  	let localProps = this.props;
	  return (
		<tr>
	      <th>{this.props.day.toString().substring(0,11) + " time:" + this.props.time}</th>

  		  {this.props.fieldIds.map(function(fieldId) {
  		  	let gsm = localProps.gameSlots[fieldId];
			  return <td><ScheduleCell 
		  		key={fieldId}
		  		gsm={gsm} /></td>;
	      })}
	    </tr>
	  )
  }
}

interface ScheduleGridProps {
  fields: FieldModel[];
  gameSlots: GameSlotModel[];
}

class ScheduleGrid extends React.Component<ScheduleGridProps, {}> {
  render() {
	var localProps = this.props;
	let fieldIds = ScheduleGrid.getFieldIds(localProps.fields);
	var rows : ScheduleRowProps[] = this.processGameSlots(localProps.gameSlots, fieldIds);
	return (
		<table>
			<thead>
			<tr><th/>
				{localProps.fields.map(function(field) {
					return <ScheduleFieldHeader fieldName= { field.name } key={field.id}/>;
				}) }
			</tr>
			</thead>
			<tbody>
			{rows.map(function(row) {
				let key = row.day.toUTCString() + row.time;
				return React.createElement(ScheduleRow, row);
			}) }
			</tbody>
		</table>
	)
  }

  private processGameSlots(gameSlots: GameSlotModel[], fieldIds: number[]): ScheduleRowProps[] {
  	var bundles : ScheduleRowProps[] = [];

  	let currentBundle : ScheduleRowProps = ScheduleGrid.createRowProps(gameSlots[0], fieldIds);
  	currentBundle.gameSlots[gameSlots[0].fieldNum] = gameSlots[0];

  	for (let ii = 1; ii < gameSlots.length; ++ii){
  		let gs = gameSlots[ii];
  		if (gs.day != currentBundle.day || gs.time != currentBundle.time) {
  			bundles.push(currentBundle);
  			currentBundle = ScheduleGrid.createRowProps(gs, fieldIds);
  		}
		currentBundle.gameSlots[gs.fieldNum] = gs;
  	}
  	bundles.push(currentBundle);
  	return bundles;
  }

  private static createRowProps(gsm: GameSlotModel, fieldIds: number[]): ScheduleRowProps {
  	let key = gsm.day.toUTCString() + gsm.time;
  	let toRet : ScheduleRowProps = {time: gsm.time, day: gsm.day, gameSlots: {}, fieldIds: fieldIds, key: key};
  	return toRet;
  }

  private static getFieldIds(fields: FieldModel[]): number[] {
  	let fieldIds: number[] = [];
  	for (let ii = 0; ii < fields.length; ++ii) {
  		fieldIds.push(fields[ii].id);
  	}
  	return fieldIds
  }
}

export default ScheduleGrid;
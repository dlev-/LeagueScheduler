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
  swapMatchups: (gsmId1: string, gsmId2: string) => void;
}

class ScheduleCell extends React.Component<ScheduleCellProps, {}> {
  dragStart(evt: any) {
  	evt.dataTransfer.setData("text", this.props.gsm.id);
  }

  dragOver(evt: any) {
  	evt.preventDefault();
  	return true;
  }

  dragDropped(evt: any) {
  	let dragSourceGsmId = evt.dataTransfer.getData("text");
  	let dragTargetGsmId = this.props.gsm.id;
  	if (dragSourceGsmId != dragTargetGsmId) {
  		this.props.swapMatchups(dragSourceGsmId, dragTargetGsmId);
  	}
  }

  render() {
  	let game = this.props.gsm;
  	if (!game) { 
  		return <div>-</div>;
  	} else if (!game.matchup){
		return <div draggable='true' 
		            onDragStart={e => this.dragStart(e)} 
		            onDragOver={e => this.dragOver(e)} 
		            onDrop={e => this.dragDropped(e)}>slot</div>;
  	} else {
	 //  return (
		// <table>
		// 	<tbody>
		// 	<tr><td>{game.matchup.team1.teamName}</td></tr>
		// 	<tr><td>{game.matchup.team2.teamName}</td></tr>
		// 	</tbody>
		// </table>	  		
	 //  );
	  return (
		<div draggable='true' 
             onDragStart={e => this.dragStart(e)} 
             onDragOver={e => this.dragOver(e)} 
             onDrop={e => this.dragDropped(e)}>
		  <div>{game.matchup.team1.teamName}</div>
		  <div>{game.matchup.team2.teamName}</div> 	
		</div> 	
	  );
  	}
  }
}

interface ScheduleRowProps {
  day: Date;
  time: number;
  gameSlots: GameSlotModel[];
  swapMatchups: (gsmId1: string, gsmId2: string) => void;
}

class ScheduleRow extends React.Component<ScheduleRowProps, {}> {
  render() {
  	let localProps = this.props;
  	let keyBase = localProps.day.toISOString() + localProps.time;
	  return (
		<tr>
	      <th>{localProps.day.toString().substring(0,11) + " time:" + this.props.time}</th>

  		  {localProps.gameSlots.map(function(gsm, index) {
  		  	let key = gsm ? gsm.dayTimeKey + gsm.fieldNum : index.toString(); 
  		  	key = keyBase + key;
			  return (
			    <td>
			      <ScheduleCell key={key} gsm={gsm} swapMatchups={localProps.swapMatchups} />
			    </td>
			  );
	      })}
	    </tr>
	  )
  }
}

interface ScheduleGridProps {
  fields: FieldModel[];
  fieldGridOfGsms: GameSlotModel[][];
  swapMatchups: (gsmId1: string, gsmId2: string) => void;
}

class ScheduleGrid extends React.Component<ScheduleGridProps, {}> {
  render() {
	var localProps = this.props;
	return (
		<table>
			<thead>
			<tr><th/>
				{localProps.fields.map(function(field) {
					return <ScheduleFieldHeader fieldName= { field.name } key={field.name}/>;
				}) }
			</tr>
			</thead>
			<tbody>
			{localProps.fieldGridOfGsms.map(function(gameSlotRow) {
				let gsm : GameSlotModel;
				for (let ii = 0; ii < gameSlotRow.length; ++ii) {
					gsm = gameSlotRow[ii];
					if (gsm) {
						break;
					}
				}

				return (
					<ScheduleRow 
					  day={gsm.day} 
					  time={gsm.time}
					  key={gsm.dayTimeKey}
					  gameSlots={gameSlotRow}
					  swapMatchups={localProps.swapMatchups} />
			    );
			}) }
			</tbody>
		</table>
	)
  }
}

export default ScheduleGrid;
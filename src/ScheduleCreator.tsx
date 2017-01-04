import * as React from "react";
import * as ReactDOM from "react-dom";
import ScheduleGrid from "./ScheduleGrid";
import GameSlotModel from "./GameSlotModel"; 
import FieldModel from "./FieldModel"; 


class ScheduleCreator {
  private _fields: FieldModel[];
  private _fieldIds: number[];
  private _gameSlots: GameSlotModel[];
  private _fieldGridOfGsms: GameSlotModel[][];

  public constructor(fields: FieldModel[], gameSlots: GameSlotModel[]) {
	this._fields = fields;
	this._gameSlots = gameSlots;
	this._fieldIds = ScheduleCreator.getFieldIds(fields);
	this._fieldGridOfGsms = ScheduleCreator.processGameSlotsForGrid(gameSlots, this._fieldIds);
	this.render();
  }

  private static processGameSlotsForGrid(gameSlots: GameSlotModel[], fieldIds: number[]): GameSlotModel[][] {
  	let fieldIdToIndex : { [fieldId: number] : number;} = {};
  	for (let ii = 0; ii < fieldIds.length; ++ii) {
  		fieldIdToIndex[fieldIds[ii]] = ii;
  	}

  	let grid: GameSlotModel[][]= [];

  	// need to fill with nulls, because array.map skips undefined
  	let currentRow : GameSlotModel[] = Array.apply(null, new Array(fieldIds.length));
  	let currentGS = gameSlots[0];
  	currentRow[fieldIdToIndex[currentGS.fieldNum]] = currentGS;

  	for (let ii = 1; ii < gameSlots.length; ++ii){
  		let gs = gameSlots[ii];
  		if (gs.dayTimeKey != currentGS.dayTimeKey) {
  			grid.push(currentRow);
  			currentRow = Array.apply(null, new Array(fieldIds.length));
  		}
  		currentRow[fieldIdToIndex[gs.fieldNum]] = gs;
		currentGS = gs;
  	}
	grid.push(currentRow);
  	return grid;
  }

  private static getFieldIds(fields: FieldModel[]): number[] {
  	let fieldIds: number[] = [];
  	for (let ii = 0; ii < fields.length; ++ii) {
  		fieldIds.push(fields[ii].id);
  	}
  	return fieldIds
  }

  private render() {
  	var swapper = (gsmId1: string, gsmId2: string) => this.swapMatchups(gsmId1, gsmId2);
	ReactDOM.render(
		<ScheduleGrid 
			fields={this._fields} 
			fieldGridOfGsms={this._fieldGridOfGsms}
			swapMatchups = {swapper}/>,
		document.getElementById("root")
	);	
  }

  private swapMatchups(gsmId1: string, gsmId2: string) {
  	let gs1 = this._findGsm(gsmId1);
  	let gs2 = this._findGsm(gsmId2);
  	let tempMatch = gs1.matchup;
  	gs1.matchup = gs2.matchup;
  	gs2.matchup = tempMatch;
  	this.render();
  }

  private _findGsm(id: string) {
  	let gss = this._gameSlots;
  	for (let ii = 0; ii < gss.length; ++ii) {
  	  if (gss[ii].id == id) {
  	  	return gss[ii];
  	  }
  	}
  	return null;
  }
}
export default ScheduleCreator;
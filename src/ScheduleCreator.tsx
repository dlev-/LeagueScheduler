import * as React from "react";
import * as ReactDOM from "react-dom";
import ScheduleGrid from "./ScheduleGrid";
import GameSlotModel from "./GameSlotModel"; 
import FieldModel from "./FieldModel"; 


class ScheduleCreator {
  private _fields: FieldModel[];
  private _fieldIds: number[];
  private _gameSlots: GameSlotModel[];
  private _fieldToGSMaps: { [fieldId: number] : GameSlotModel;}[];

  public constructor(fields: FieldModel[], gameSlots: GameSlotModel[]) {
	this._fields = fields;
	this._gameSlots = gameSlots;
	this._fieldIds = ScheduleCreator.getFieldIds(fields);
	this._fieldToGSMaps = ScheduleCreator.processGameSlots(gameSlots);
	this.render();
  }

  private static processGameSlots(gameSlots: GameSlotModel[]): { [fieldId: number] : GameSlotModel;}[] {
  	var bundles : { [fieldId: number] : GameSlotModel;}[] = [];

  	let currentBundle : { [fieldId: number] : GameSlotModel;} = {};
  	let currentGS = gameSlots[0];
  	currentBundle[currentGS.fieldNum] = currentGS;

  	for (let ii = 1; ii < gameSlots.length; ++ii){
  		let gs = gameSlots[ii];
  		if (gs.dayTimeKey != currentGS.dayTimeKey) {
  			bundles.push(currentBundle);
  			currentBundle = {};
  		}
		currentBundle[gs.fieldNum] = gs;
		currentGS = gs;
  	}
  	bundles.push(currentBundle);
  	return bundles;
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
			fieldIds = {this._fieldIds}
			fieldToGSMaps={this._fieldToGSMaps}
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
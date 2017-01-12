import MatchupModel from './MatchupModel.ts';
import GameSlotModel from './GameSlotModel.ts';

class ScheduleModel { 
	private _gameSlots: GameSlotModel[] = [];
	private _unasignedMatchups: MatchupModel[] = [];

	get gameSlots() {
		return this._gameSlots;
	}

	get unasignedMatchups() {
		return this._unasignedMatchups;
	}

	public addGameSlot(gsm: GameSlotModel): void {
		this._gameSlots.push(gsm);
	}

	public sortGameSlots(): void {
		this._gameSlots.sort(GameSlotModel.compare);
	}
}

export default ScheduleModel;

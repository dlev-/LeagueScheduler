import GameSlotModel from './GameSlotModel.ts';

class ScheduleModel { 
	private _gameSlots: GameSlotModel[] = [];

	get gameSlots() {
		return this._gameSlots;
	}

	public addGameSlot(gsm: GameSlotModel): void {
		this._gameSlots.push(gsm);
	}

	public sortGameSlots(): void {
		this._gameSlots.sort(GameSlotModel.compare);
	}
}

export default ScheduleModel;

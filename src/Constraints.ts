import GameSlotModel from "./GameSlotModel";
import FieldModel from "./FieldModel";


abstract class ScheduleConstraint
{
	private _cost: number;
	
	constructor(cost: number)
	{
		this._cost = cost;
	}
	
	get cost():number {
		return this._cost;
	}

	public abstract eval(gameSlots: GameSlotModel[]) : GameSlotModel[];
}

class NeighboringFieldResolver {
	private _fieldIdToNeighborsMap: { [id: number]: { [fId: number]: boolean} };

	constructor (fields: FieldModel[]) {
//		this._fieldIdToNeighborsMap = fields;
	}

	public areNeighbors(fieldId1: number, fieldId2: number): boolean 
	{
		return fieldId2 in this._fieldIdToNeighborsMap[fieldId1];
	}
}


class NonConsecutiveGameConstraint extends ScheduleConstraint {
	private static S_COST = 10000000.0;
	private static S_GAME_HOUR_DURATION = 2;
	public static s_fieldNeighborResolver: NeighboringFieldResolver;

	constructor ()
	{	
		super(NonConsecutiveGameConstraint.S_COST);
	}
	
	public eval(gameSlots: GameSlotModel[]) : GameSlotModel[]
	{
		let badGameSlots: GameSlotModel[] = [];
		for (let ii = 1; ii < gameSlots.length; ++ii)
		{
			let lastGsm = gameSlots[ii-1];
			let gsm = gameSlots[ii];
			if (this.gamesOnSameDay(gsm, lastGsm))
			{
				let timeBetweenGames = Math.abs(gsm.time - lastGsm.time);
				if (timeBetweenGames > NonConsecutiveGameConstraint.S_GAME_HOUR_DURATION ||
					!NonConsecutiveGameConstraint.s_fieldNeighborResolver.areNeighbors(gsm.fieldNum, lastGsm.fieldNum))
				{
					badGameSlots.push(gsm);
				}
			}
		}
		return badGameSlots;
	}

	private gamesOnSameDay(g1: GameSlotModel, g2: GameSlotModel): boolean 
	{
		return (g1.day == g2.day);
	}
}

class NumGamesOnSameDayConstraint extends ScheduleConstraint {
	private static S_COST = 100000.0;
	private _maxGames: number;

	constructor (maxGames: number)
	{	
		super(NumGamesOnSameDayConstraint.S_COST);
		this._maxGames = maxGames;
	}

	public eval(gameSlots: GameSlotModel[]) : GameSlotModel[] 
	{
		let badGameSlots: GameSlotModel[] = [];
		let gamesOnDay = 1;
		let prevDay = gameSlots[0].day;
		for (let ii = 1; ii < gameSlots.length; ++ii) 
		{
			let gameDay = gameSlots[ii].day;
			if (prevDay = gameDay) {
				gamesOnDay ++;
				if (gamesOnDay > this._maxGames) {
					badGameSlots.push(gameSlots[ii]);
				}
			} else {
				prevDay = gameDay;
				gamesOnDay = 1;
			}
		}
		return badGameSlots;
	}
}


import GameSlotModel from "./ScheduleModel";
import FieldModel from "./ScheduleModel";


abstract class ScheduleConstraint
{
	private _cost: number;
	
	protected constructor(cost: number)
	{
		this._cost = cost;
	}
	
	get cost():number {
		return this._cost;
	}

	public abstract eval(gameSlots: GameSlotModel[]) : GameSlotModel[];
}

class NeighboringFieldResolver {
	private _fieldIdToNeighborsMap: any;

	constructor (fields: FieldModel[]) {

	}

	public areNeighbors(fieldId1: number, fieldId2: number): boolean {
		
	}
}


class NonConsecutiveGameConstraint extends ScheduleConstraint {
	private m_fieldNames: string[];
	private static S_COST = 10000000.0;
	
	constructor ()
	{	
		super(NonConsecutiveGameConstraint.S_COST);
	}
	
	public Pair<GameSlotInfo, Double> eval(ArrayList<GameSlotInfo> gameSlots) 
	{
		int count = 0;
		GameSlotInfo toRetGsi = null;
		GameSlotInfo lastGsi = null;
		for (GameSlotInfo gsi : gameSlots)
		{
			if (lastGsi != null &&
				lastGsi.getGameDay().getDateString().equals(gsi.getGameDay().getDateString()))
			{
				if (!DoubleHeaderConstraint.areNeighboringFields(m_fieldNames, gsi, lastGsi) ||
					Schedule.S_GAME_HOUR_DURATION != Math.abs(gsi.getGameTime().getHour() - lastGsi.getGameTime().getHour()))
				{
					toRetGsi = gsi;
					++count;
				}
			}
			lastGsi = gsi;
		}
		return new Pair<GameSlotInfo, Double>(toRetGsi, count * getCost());
	}
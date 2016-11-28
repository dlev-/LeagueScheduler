import RootModel from "./RootModel";
import ScheduleModel from "./ScheduleModel";
import GameSlotModel from "./GameSlotModel";
import TeamModel from "./teamModel";
import DateUtils from "./DateUtils";
import * as _ from "underscore"

class ScheduleValidator {
	public static validateByes(root: RootModel) {
		let errorAccumulator: string[] = [];
		let gameDays = ScheduleValidator.findGameDays(root.schedule);
		let daysOfWeek = ScheduleValidator.getValidDaysOfWeek(gameDays);
		console.log(daysOfWeek);	
		for (let team of root.teams) {
			let errorMessage = ScheduleValidator.validateTeam(gameDays, team, daysOfWeek);
			if (errorMessage) {
				errorAccumulator.push(errorMessage);
			}
		}
		return errorAccumulator;
	}

	private static findGameDays(sched: ScheduleModel) :Date[] {
		let days = _.map(sched.gameSlots, (slot:GameSlotModel) => {return slot.day;});
		return _.uniq(days);	
	}

	private static getValidDaysOfWeek(days: Date[]): string[] {
		let daysOfWeek = _.uniq(_.map(days, (d:Date) => {return d.getDay();}));
		let dayNames = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
		return _.map(daysOfWeek, (day:number) => {return dayNames[day];});
	}

	private static validateTeam(days: Date[], team: TeamModel, daysOfWeek: string[]): string {
		for (let byeDay of team.byes) {
			if (!_.contains(days, byeDay)) {
				return "Team " + team.teamName + " requested bye " + 
					DateUtils.niceStringForDate(byeDay) + 
					", but that is not a day when games are scheduled.";
			}
		}
		if (team.badDayOfWeek && !_.contains(daysOfWeek, team.badDayOfWeek.toLowerCase())) {
			return "Team " + team.teamName + " asked for no games on " + 
				team.badDayOfWeek + "s, but that is not a day of the week when games on scheduled.";
		}
		return "";
	}
}

export default ScheduleValidator;
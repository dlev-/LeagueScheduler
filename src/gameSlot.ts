class GameSlot {
	day: Date;
	time: number;
	fieldNum: number;
	game: Game;

	constructor(day: Date, time: number, fieldNum: number) {
		this.day = day;
		this.time = time;
		this.fieldNum = fieldNum;
	}
}
